import os
import re
import xml.etree.ElementTree as ET

_SVG_NAMESPACE = 'http://www.w3.org/2000/svg'
_VALID_PATH_COMMANDS = "MLTHVCSQAZ"
_RE_FLOAT = re.compile(r'[+-]?\d*(\.\d+)?')

def log_change(message):
    """Logs the changes made to the SVG."""
    print(message)

def resize_path(path, x_factor, y_factor):
    result = ""
    index = 0
    length = len(path)

    def eat_number(factor):
        nonlocal result
        nonlocal index
        match = _RE_FLOAT.match(path[index:])
        if not match:
            return
        found = match.group(0)
        scaled = factor * float(found)
        index += len(found)
        result += f"{scaled:.4f}".rstrip('0').rstrip('.')

    def skip_space():
        nonlocal index
        while index < length and (path[index] == " " or path[index] == ","):
            index += 1

    def eat_space():
        nonlocal result
        skip_space()
        result += " "

    def eat_scale_xy():
        nonlocal result
        eat_number(x_factor)
        skip_space()
        result += ","
        eat_number(y_factor)

    def eat_for_command(command):
        if command in "MLT":
            eat_scale_xy()
        elif command == "H":
            eat_number(x_factor)
        elif command == "V":
            eat_number(y_factor)
        elif command == "C":
            eat_scale_xy()
            eat_space()
            eat_scale_xy()
            eat_space()
            eat_scale_xy()
        elif command in "SQ":
            eat_scale_xy()
            eat_space()
            eat_scale_xy()
        elif command == "A":
            eat_scale_xy()
            eat_space()
            eat_number(1)  # x-axis-rotation
            eat_space()
            eat_number(1)  # large-arc-flag
            eat_space()
            eat_number(1)  # sweep-flag
            eat_space()
            eat_scale_xy()
        elif command == "Z":
            pass
        else:
            raise ValueError("Unknown command", command)

    repeating_command = ''
    while index < length:
        skip_space()
        lead = path[index].upper()
        if lead in _VALID_PATH_COMMANDS:
            result += path[index]
            index += 1
            eat_for_command(lead)
            repeating_command = lead
        else:
            result += " "
            eat_for_command(repeating_command)

    return result

def process_svg(svg_path):
    tree = ET.parse(svg_path)
    root = tree.getroot()
    changes_made = []

    # Set stroke and stroke-width to 'inherit'
    for elem in root.iter():
        if 'stroke' in elem.attrib and elem.attrib['stroke'] != 'inherit':
            changes_made.append("Changed 'stroke' to 'inherit'")
            elem.set('stroke', 'inherit')
        if 'stroke-width' in elem.attrib and elem.attrib['stroke-width'] != 'inherit':
            changes_made.append("Changed 'stroke-width' to 'inherit'")
            elem.set('stroke-width', 'inherit')

    # Normalize the viewBox
    if 'viewBox' in root.attrib:
        viewBox = root.attrib['viewBox'].split()
        min_x, min_y, width, height = map(float, viewBox)

        # Calculate scale factor
        scale_factor = 512 / max(width, height)

        if scale_factor != 1.0:
            new_width = width * scale_factor
            new_height = height * scale_factor
            changes_made.append(f"Scaled viewBox from {root.attrib['viewBox']} to {min_x} {min_y} {new_width} {new_height}")
            # Update viewBox
            root.attrib['viewBox'] = f"{min_x} {min_y} {new_width} {new_height}"

            # Apply scaling to all paths and shapes
            scale_svg_elements(root, scale_factor, changes_made)

    if changes_made:
        # Remove namespace and save the modified SVG
        remove_namespace(root)
        tree.write(svg_path, xml_declaration=True, encoding='utf-8')
        return ", ".join(changes_made) + " - Saved changes."
    else:
        return "Keine Änderungen vorgenommen."

def scale_svg_elements(elem, scale_factor, changes_made):
    for child in elem:
        if 'd' in child.attrib:
            original_d = child.attrib['d']
            child.attrib['d'] = resize_path(original_d, scale_factor, scale_factor)
            changes_made.append(f"Scaled path 'd' from: {original_d[:50]}... to: {child.attrib['d'][:50]}...")
        # Scale other attributes if necessary (e.g., 'x', 'y', 'width', 'height')
        for attr in ['x', 'y', 'width', 'height']:
            if attr in child.attrib:
                original_value = float(child.attrib[attr])
                new_value = original_value * scale_factor
                child.attrib[attr] = str(new_value)
                changes_made.append(f"Scaled '{attr}' from {original_value} to {new_value}")
        scale_svg_elements(child, scale_factor, changes_made)

def remove_namespace(elem):
    """Remove namespace from SVG elements."""
    for child in elem.iter():
        child.tag = child.tag.split('}')[-1]  # Removes namespace
    elem.attrib.pop('{http://www.w3.org/2000/svg}', None)  # Remove xmlns attribute if exists

def main():
    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    log_change(f"Script directory: {script_dir}")

    # Process all SVGs in that directory
    for filename in os.listdir(script_dir):
        if filename.endswith(".svg"):
            svg_path = os.path.join(script_dir, filename)
            changes_log = process_svg(svg_path)
            log_change(f"{filename}: {changes_log}")

if __name__ == "__main__":
    main()
