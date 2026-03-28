// import { Uploader, Message, Loader} from "rsuite";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "sonner";
import { Upload } from "antd";
const Uploader = () => {
  const [fileInfo] = React.useState(null);

  // const handleServiceCall = () => {};

  // const { mutate } = useMutation({
  //   mutationFn: handleServiceCall,
  //   onSuccess: (response: any) => {
  //     // if (response.statusCode === 200) {
  //     //   toast.success(`${response.message}`);
  //     //   setFileInfo(response);
  //     // }
  //     toast("Event has been created", {
  //       description: "Sunday, December 03, 2023 at 9:00 AM",
  //       action: {
  //         label: "Undo",
  //         onClick: () => console.log("Undo"),
  //       },
  //     });
  //   },
  //   onError: (error) => {
  //     toast("Upload failed", {
  //       description: "Failed to upload profile piture.",
  //     });
  //   },
  // });

  const customRequest = async ({ file }: any) => {
    console.log({ file });
    toast.success(
      <div className="leading-[.5]">
        <h3 className="text-[#201E43] text-[14px]">Upload success</h3>
        <p className="text-[#201E43] text-[12px]">
          Profile picture uploaded successfully
        </p>
      </div>
    );
    // await mutate(file);
  };

  return (
    <Upload
      customRequest={customRequest}
      showUploadList={false} // Hide default upload list
      className=""
      accept=".jpeg,.jpg,.png"
    >
      <button
        style={{ width: 150, height: 150 }}
        className="border border-[#508C9B] bg-[#508C9B] mb-0 rounded-md flex items-center justify-center mt-[20px]"
      >
        {fileInfo ? (
          <img src={fileInfo} width="100%" height="100%" />
        ) : (
          <FaUserAlt size={140} />
        )}
      </button>
    </Upload>
  );
};

export default Uploader;
