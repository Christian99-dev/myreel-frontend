import os
import xml.etree.ElementTree as ET

def log_change(message):
    """Logs the changes made to the SVG."""
    print(message)

def process_svg_folder(folder_path):
    for filename in os.listdir(folder_path):
        if filename.endswith(".svg"):
            svg_path = os.path.join(folder_path, filename)
            changes_log = f"{filename}: "  # Initialize the log for the current SVG
            changes_log += process_svg(svg_path)
            log_change(changes_log)

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
        # Save the modified SVG
        tree.write(svg_path)
        return ", ".join(changes_made) + " - Saved changes."
    else:
        return "No changes made."

def scale_svg_elements(elem, scale_factor, changes_made):
    for child in elem:
        if 'd' in child.attrib:
            original_d = child.attrib['d']
            child.attrib['d'] = scale_path(child.attrib['d'], scale_factor)
            changes_made.append(f"Scaled path 'd' from: {original_d[:50]}... to: {child.attrib['d'][:50]}...")
        # Scale other attributes if necessary (e.g., 'x', 'y', 'width', 'height')
        for attr in ['x', 'y', 'width', 'height']:
            if attr in child.attrib:
                original_value = float(child.attrib[attr])
                new_value = original_value * scale_factor
                child.attrib[attr] = str(new_value)
                changes_made.append(f"Scaled '{attr}' from {original_value} to {new_value}")
        scale_svg_elements(child, scale_factor, changes_made)

def scale_path(d_attr, scale_factor):
    # Scale the path's 'd' attribute by the scale factor
    commands = "MmZzLlHhVvCcSsQqTtAa"
    new_d = []
    current_num = ''
    
    for char in d_attr:
        if char in commands:
            if current_num:
                new_d.append(str(float(current_num) * scale_factor))
                current_num = ''
            new_d.append(char)
        elif char == '-' or char == '.':
            if current_num:
                new_d.append(str(float(current_num) * scale_factor))
            new_d.append(char)
            current_num = ''
        elif char.isdigit():
            current_num += char
        elif char.isspace() and current_num:
            new_d.append(str(float(current_num) * scale_factor))
            current_num = ''
            new_d.append(char)
        else:
            new_d.append(char)
    
    if current_num:
        new_d.append(str(float(current_num) * scale_factor))
    
    return ''.join(new_d)

def main():
    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    log_change(f"Script directory: {script_dir}")
    
    # Process all SVGs in that directory
    process_svg_folder(script_dir)
    log_change("All SVG files processed.")

if __name__ == "__main__":
    main()