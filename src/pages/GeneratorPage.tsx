import { useParams, Navigate } from "react-router-dom";
import { templates } from "@/data/templates";
import { TemplateGenerator } from "@/components/TemplateGenerator";

const GeneratorPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const template = templates.find(t => t.slug === slug);

  if (!template) {
    return <Navigate to="/" replace />;
  }

  return <TemplateGenerator key={template.id} template={template} />;
};

export default GeneratorPage;
