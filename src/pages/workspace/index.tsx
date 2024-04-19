import ApprovePage from "@/components/Approve";
import VirifyAgent from "@/components/VerifyAgent";

const WorkSpacePage = () => {
  return (
    <>
      <style jsx global>{`
        body {
          font-family: Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol";
        }
      `}</style>
      <div className="main">
        <ApprovePage />

        <VirifyAgent/>
      </div>
    </>
  );
};

export default WorkSpacePage;
