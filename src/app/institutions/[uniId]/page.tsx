import MockUp from "./mock-up";

async function Page({ params }: { params: Promise<{ uniId: string }> }) {
  const { uniId } = await params;

  return (
    <div>
      <MockUp uniId={uniId} />
    </div>
  );
}

export default Page;
