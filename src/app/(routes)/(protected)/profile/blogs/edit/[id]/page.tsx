import { ContentLayout } from "@/components/admin-sidebar-layout/content-layout";
import EditBlogForm from "../../../_components/blogs/edit/blogs-edit-form";

const EditBlogPage = async ({ params }: { params: { id: string } }) => {
  return (
    <ContentLayout title="Edit Blog">
      <EditBlogForm blogId={params.id} />
    </ContentLayout>
  );
};

export default EditBlogPage;
