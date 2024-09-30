/**
 * Lädt ein Video von einer gegebenen URL und konvertiert es in ein File-Objekt.
 * @param videoUrl - Die URL des Videos, das abgerufen werden soll.
 * @returns Ein Promise, das das konvertierte File-Objekt zurückgibt.
 * @throws Ein Fehler, wenn das Abrufen oder die Konvertierung fehlschlägt.
 */
export async function fetchVideoFile(videoUrl: string): Promise<File> {
    try {
      const response = await fetch(videoUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const blob = await response.blob();
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'existing-video';
  
      // Extrahiere den Dateinamen aus den Headern, falls vorhanden
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match && match[1]) {
          filename = match[1];
        }
      } else {
        // Fallback: Verwende eine Standardendung basierend auf dem Blob-Typ
        const extension = blob.type.split('/')[1] || 'mp4';
        filename = `existing-video.${extension}`;
      }
  
      return new File([blob], filename, { type: blob.type });
    } catch (error) {
      console.error("Fehler beim Abrufen des Videos für videoFile:", error);
      throw error;
    }
  }