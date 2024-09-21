import { SelectCategory } from "@/app/components/SelectedCategory";
import { Button } from "@/components/ui/button";

export default function StructureRoute() {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Quelle catégorie décrit le mieux votre logement ?
        </h2>
      </div>

      <form>
        <SelectCategory />

        <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
          <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
            <Button variant="secondary" size="lg">
              Annuler
            </Button>
            <Button size="lg">Enregistrer</Button>
          </div>
        </div>
      </form>
    </>
  );
}
