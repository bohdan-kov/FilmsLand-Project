export const bufferToBase64Image = (buffer, contentType) => {
  if (!buffer || !contentType) return null;

  if (typeof buffer === 'string') {
    return `data:${contentType};base64,${buffer}`;
  }

  const binary = new Uint8Array(buffer).reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ""
  );
  const base64String = btoa(binary);

  return `data:${contentType};base64,${base64String}`;
};
