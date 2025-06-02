export const fileToDataUrlNodeJS = (fileBuffer: Buffer, mimeType: string): string => {
  const base64Data = fileBuffer.toString('base64'); // Convert buffer to base64 string
  return `data:${mimeType};base64,${base64Data}`; // Return the data URL
};