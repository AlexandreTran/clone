import { createCategoryPage } from "@/app/action";
import { CreationButtonBar } from "@/app/components/CreationButtonBar";
import { SelectCategory } from "@/app/components/SelectedCategory";

export default function StructureRoute({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Quelle catégorie décrit le mieux votre logement ?
        </h2>
      </div>
      <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={params.id} />
        <SelectCategory />

        <CreationButtonBar />
      </form>
    </>
  );
}
