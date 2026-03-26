import { useState, useRef, useCallback } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { TemplateDef } from "@/data/templates";

interface Props {
  template: TemplateDef;
}

export function TemplateGenerator({ template }: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [patologia, setPatologia] = useState(false);
  const [copied, setCopied] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const updateValue = useCallback((id: string, val: string) => {
    setValues(prev => ({ ...prev, [id]: val }));
  }, []);

  const handleCopy = async () => {
    if (!reportRef.current) return;
    try {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(reportRef.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
      await navigator.clipboard.writeText(reportRef.current.innerText);
      selection?.removeAllRanges();
      setCopied(true);
      toast.success("Reporte copiado al portapapeles");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      document.execCommand("copy");
      toast.success("Reporte copiado");
    }
  };

  const handleReset = () => {
    setValues({});
    setPatologia(false);
    toast.info("Formulario reiniciado");
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {template.icon} {template.title}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Complete los datos y obtenga la plantilla generada en tiempo real
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reiniciar
        </Button>
      </div>

      {/* Input Section */}
      <div className="section-card">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">
          Datos del Paciente
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Nombre</label>
            <input
              type="text"
              className="input-medical"
              value={values["nombre"] || ""}
              onChange={e => updateValue("nombre", e.target.value)}
              placeholder="Nombre del paciente"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Fecha</label>
            <input
              type="date"
              className="input-medical"
              value={values["fecha"] || ""}
              onChange={e => updateValue("fecha", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Edad</label>
            <input
              type="text"
              className="input-medical"
              value={values["edad"] || ""}
              onChange={e => updateValue("edad", e.target.value)}
              placeholder="Edad"
            />
          </div>
        </div>
      </div>

      {/* Measurement Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {template.fieldGroups.map(group => (
          <div key={group.title} className="section-card">
            <h3 className="font-display text-sm font-semibold text-primary mb-3">{group.title}</h3>
            <div className="space-y-3">
              {group.fields.map(field => (
                <div key={field.id}>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    className="input-medical"
                    value={values[field.id] || ""}
                    onChange={e => updateValue(field.id, e.target.value)}
                    placeholder={field.placeholder || field.label}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Diagnostic Impression */}
        <div className="section-card">
          <h3 className="font-display text-sm font-semibold text-primary mb-3">Impresión Diagnóstica</h3>
          <textarea
            className="input-medical min-h-[100px] resize-y"
            value={values["impresion-diagnostica"] || ""}
            onChange={e => updateValue("impresion-diagnostica", e.target.value)}
            placeholder="Escriba la impresión diagnóstica aquí..."
          />
        </div>

        {/* Pathology Toggle */}
        <div className="section-card">
          <h3 className="font-display text-sm font-semibold text-primary mb-3">Patología</h3>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="patologia"
                checked={!patologia}
                onChange={() => setPatologia(false)}
                className="accent-primary"
              />
              <span className="text-sm">No</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="patologia"
                checked={patologia}
                onChange={() => setPatologia(true)}
                className="accent-primary"
              />
              <span className="text-sm">Sí</span>
            </label>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Vista Previa del Reporte
          </h2>
          <Button onClick={handleCopy} size="sm" className="gap-2">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "¡Copiado!" : "Copiar Reporte"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Ojo: Esto solo cubre las medidas insertadas. Para patologías, diagnósticos y descripciones personalizadas, modifique el documento luego de copiar.
        </p>
        <div ref={reportRef} className="report-preview">
          {template.renderReport(values, patologia)}
        </div>
      </div>
    </div>
  );
}
