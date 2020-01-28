export const readFirstFile = (fileHandles, onLoad) => {
  if (fileHandles && fileHandles.length > 0) {
    const reader = new FileReader();
    reader.onload = () => onLoad({ filename: fileHandles[0].name, body: reader.result });
    reader.readAsBinaryString(fileHandles[0]);
  }
};
