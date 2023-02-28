import { FormEvent, useState } from "react";

function UploadForm() {
  const [fileUrl, setFileUrl] = useState<string | undefined>();

  const onChange = (event: FormEvent) => {
    const { files } = event.target as HTMLInputElement;

    if (!files) return;
    setFileUrl(window.URL.createObjectURL(files[0]));
  };

  return (
    <div className="bg-white w-full h-full aspect-video p-3 rounded-xl">
      <form onChange={onChange}>
        <input type="file" accept="image/*" />
      </form>

      {fileUrl && <img src={fileUrl} />}
    </div>
  );
}

export default UploadForm;
