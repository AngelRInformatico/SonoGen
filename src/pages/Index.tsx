import { Link } from "react-router-dom";
import { templates } from "@/data/templates";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-foreground">
          SonoGen
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Sistema de generación de plantillas para reportes sonográficos. 
          Seleccione un tipo de estudio para comenzar a generar su reporte con los datos del paciente.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(t => (
          <Link
            key={t.id}
            to={`/generador/${t.slug}`}
            className="section-card group hover:border-primary/40 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">{t.icon}</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="font-display text-base font-semibold text-foreground mt-3">
              {t.shortTitle}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {t.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
