export const bufferToBase64Image = (photo) => {
  if (!photo?.data?.data || !photo?.contentType) return null;

  const binary = new Uint8Array(photo.data.data).reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  );

  const base64String = btoa(binary);

  return `data:${photo.contentType};base64,${base64String}`;
}