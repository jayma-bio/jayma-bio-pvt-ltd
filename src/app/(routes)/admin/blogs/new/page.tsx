import { ContentLayout } from "@/components/admin-sidebar-layout/content-layout";
import AddBlogForm from "../../_components/blogs/add/blogs-add-form";

const AddBlogPage = () => {
  return (
    <ContentLayout title="Add Blog">
      <AddBlogForm />
    </ContentLayout>
  );
};

export default AddBlogPage;
