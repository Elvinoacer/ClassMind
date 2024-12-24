function PDFDisplay({
  pdfPicked,
  uploader,
  handleOpenModal,
}: {
  handleOpenModal?: () => void;
  pdfPicked: string;
  uploader?: string;
}) {
  return (
    <div className=" w-full absolute  mt-20">
      <div className="head w-full flex justify-center">
        <br />
        <i className=" text-red-500">Uploaded by {uploader ?? "anonymous"}</i>
        <button
          onClick={() => {
            if (handleOpenModal) {
              handleOpenModal();
            }
          }}
          className="bg-[#3c91e6] font-bold px-4 py-1 rounded-full ]"
        >
          close
        </button>
      </div>
      <div className="w-full h-full flex justify-center align-middle">
        {pdfPicked ? (
          <iframe
            className="w-full ml-8 bg-slate-500 h-[500px] rounded-xl"
            src={pdfPicked}
          ></iframe>
        ) : (
          <div className="mt-8 text-lg">No DOC selected yet</div>
        )}
      </div>
    </div>
  );
}

export default PDFDisplay;
