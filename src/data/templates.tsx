import React from "react";

export interface FieldDef {
  id: string;
  label: string;
  type?: "text" | "date" | "textarea";
  placeholder?: string;
  width?: "full" | "half" | "third";
}

export interface FieldGroup {
  title: string;
  fields: FieldDef[];
}

export interface TemplateDef {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  fieldGroups: FieldGroup[];
  renderReport: (values: Record<string, string>, patologia: boolean) => React.ReactNode;
}

// Shared patient header component for all reports
const PatientHeader = ({ values }: { values: Record<string, string> }) => (
  <>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <tbody>
        <tr>
          <td style={{ border: "1px solid currentColor", width: "50%", padding: "4px 8px" }}>
            <b>NOMBRE: {(values["nombre"] || "").toUpperCase()}</b>
          </td>
          <td style={{ border: "1px solid currentColor", width: "50%", padding: "4px 8px" }}>
            <b>FECHA: {values["fecha"] || ""}</b>
          </td>
        </tr>
        <tr>
          <td style={{ border: "1px solid currentColor", padding: "4px 8px" }}>
            <b>EDAD: {values["edad"] || ""}</b>
          </td>
          <td style={{ border: "1px solid currentColor", padding: "4px 8px" }}>
            <b>AMBULATORIO</b>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
  </>
);

const DiagnosticFooter = ({ values, patologia, patologiaText }: { values: Record<string, string>; patologia: boolean; patologiaText: string }) => {
  const lines = (values["impresion-diagnostica"] || "").split(/\r?\n/).filter(Boolean);
  return (
    <>
      <p><b>IMPRESIÓN DIAGNÓSTICA</b></p>
      <div>
        {lines.length > 0 ? lines.map((line, i) => (
          <p key={i} style={{ margin: 0, padding: 0 }}>• {line.toUpperCase()}</p>
        )) : <p style={{ margin: 0 }}>IMPRESIÓN DIAGNÓSTICA</p>}
      </div>
      <br />
      {!patologia && <p><b>{patologiaText}</b></p>}
      <p>
        <b><i>Dra. Ibel Ramos</i><br />Médico Sonografista</b>
      </p>
    </>
  );
};

const V = (values: Record<string, string>, key: string, fallback = "0") => values[key] || fallback;

export const templates: TemplateDef[] = [
  {
    id: "abdominal",
    slug: "abdominal",
    title: "Sonografía Abdominal",
    shortTitle: "Abdominal",
    icon: "🫁",
    fieldGroups: [
      {
        title: "Hígado",
        fields: [{ id: "higado-diametro", label: "Diámetro" }],
      },
      {
        title: "Vesícula Biliar",
        fields: [
          { id: "vesicula-biliar-l1", label: "L1" },
          { id: "vesicula-biliar-l2", label: "L2" },
        ],
      },
      {
        title: "Bazo",
        fields: [{ id: "bazo-longitudes", label: "Longitudes" }],
      },
      {
        title: "Riñones",
        fields: [
          { id: "riñon-derecho-l1", label: "Riñón Der. L1" },
          { id: "riñon-derecho-l2", label: "Riñón Der. L2" },
          { id: "riñon-izquierdo-l1", label: "Riñón Izq. L1" },
          { id: "riñon-izquierdo-l2", label: "Riñón Izq. L2" },
        ],
      },
    ],
    renderReport: (v, pat) => (
      <>
        <PatientHeader values={v} />
        <p style={{ textAlign: "center", fontSize: "12pt" }}><b>SONOGRAFÍA ABDOMINAL</b></p>
        <p>Utilizando equipo <b>General Electric</b> de última generación y transductor convexo de alta definición para la valoración, observamos:</p>
        <p><b>Hígado:</b> De ecotextura conservada, no tumoral, con buena visibilidad de sus vasos y ductos. La relación entre sus lóbulos es adecuada. <b>Mide: {V(v, "higado-diametro")}cm.</b></p>
        <p><b>Vesícula biliar:</b> De paredes delimitadas. <b>Mide: {V(v, "vesicula-biliar-l1")}x{V(v, "vesicula-biliar-l2")}cm.</b></p>
        <p><b>Vías biliares y portal intra y extrahepática:</b> De calibre dentro de la normalidad.</p>
        <p><b>Páncreas:</b> Se visualiza de forma, tamaño y características conservadas.</p>
        <p><b>Bazo:</b> De ecopatrón conservado. <b>Mide: {V(v, "bazo-longitudes", "0x0")}cm.</b></p>
        <p><b>Riñones:</b> De localización habitual y ecotextura adecuada, tamaño conservado, bordes definidos y contornos regulares, mostrando una adecuada relación cortico medular. Sistema pelvo-calicial sin alteraciones.</p>
        <p><b>Riñón derecho:</b> {V(v, "riñon-derecho-l1")}x{V(v, "riñon-derecho-l2")}cm.<br /><b>Riñón izquierdo:</b> {V(v, "riñon-izquierdo-l1")}x{V(v, "riñon-izquierdo-l2")}cm.</p>
        <p><b>Aorta abdominal:</b> Se visualiza de forma, tamaño y características conservadas.</p>
        <DiagnosticFooter values={v} patologia={pat} patologiaText="SIN PATOLOGIA APARENTE" />
      </>
    ),
  },
  {
    id: "tiroides",
    slug: "tiroides",
    title: "Sonografía de Tiroides",
    shortTitle: "Tiroides",
    icon: "🦋",
    fieldGroups: [
      {
        title: "Lóbulo Derecho",
        fields: [
          { id: "lobulo-derecho-l1", label: "Longitud (L1)" },
          { id: "lobulo-derecho-l2", label: "Transverso (L2)" },
          { id: "lobulo-derecho-l3", label: "Anteroposterior (L3)" },
          { id: "lobulo-derecho-vol", label: "Volumen (ml)" },
        ],
      },
      {
        title: "Lóbulo Izquierdo",
        fields: [
          { id: "lobulo-izquierdo-l1", label: "Longitud (L1)" },
          { id: "lobulo-izquierdo-l2", label: "Transverso (L2)" },
          { id: "lobulo-izquierdo-l3", label: "Anteroposterior (L3)" },
          { id: "lobulo-izquierdo-vol", label: "Volumen (ml)" },
        ],
      },
      {
        title: "Istmo",
        fields: [{ id: "istmo", label: "Medida (cm)" }],
      },
    ],
    renderReport: (v, pat) => (
      <>
        <PatientHeader values={v} />
        <p style={{ textAlign: "center", fontSize: "12pt" }}><b>U/S DE TIROIDES:</b></p>
        <p>Realizamos sonograma con transductor lineal de alta resolución en el área del cuello.</p>
        <p><b>Se observó:</b></p>
        <p><b>GLÁNDULA TIROIDES:</b> Luce de tamaño adecuado, de ecotextura homogénea y con contornos regulares, sin evidencia de imágenes quísticas ni nodulares.</p>
        <p><b>MEDIDAS: (Long-Transv - AP).</b></p>
        <p><b>LÓBULO DERECHO:</b> {V(v, "lobulo-derecho-l1")}x{V(v, "lobulo-derecho-l2")}x{V(v, "lobulo-derecho-l3")}cm. Vol: {V(v, "lobulo-derecho-vol")}ml.<br /><b>LÓBULO IZQUIERDO:</b> {V(v, "lobulo-izquierdo-l1")}x{V(v, "lobulo-izquierdo-l2")}x{V(v, "lobulo-izquierdo-l3")}cm. Vol: {V(v, "lobulo-izquierdo-vol")}ml.</p>
        <p><b>ISTMO:</b> Forma y textura normal que <b>Mide: {V(v, "istmo")}cm.</b></p>
        <p><b>VASOS DEL CUELLO:</b> Arterias carótidas y venas yugulares con forma y calibre normal.</p>
        <p><b>ARTERIAS CARÓTIDAS Y VENAS YUGULARES:</b> Lucen forma y calibre normal.</p>
        <DiagnosticFooter values={v} patologia={pat} patologiaText="ESTUDIO SIN HALLAZGOS PATOLÓGICOS" />
        <p><b>TI-RADS-1</b></p>
      </>
    ),
  },
  {
    id: "gineco-ovarios",
    slug: "pelvica-ginecologica-ovarios",
    title: "Sonografía Pélvica Ginecológica + Ovarios",
    shortTitle: "Pélvica + Ovarios",
    icon: "🩺",
    fieldGroups: [
      {
        title: "Cavidad Uterina",
        fields: [{ id: "cavidad-uterina", label: "Grosor (cm)" }],
      },
      {
        title: "Medidas del Útero",
        fields: [
          { id: "utero-longitudinal", label: "Longitud" },
          { id: "utero-transversal", label: "Transversal" },
          { id: "utero-anteroposterior", label: "Antero-Posterior" },
        ],
      },
      {
        title: "Ovario Derecho",
        fields: [
          { id: "ovario-derecho-l1", label: "L1" },
          { id: "ovario-derecho-l2", label: "L2" },
          { id: "ovario-derecho-l3", label: "L3" },
          { id: "ovario-derecho-vol", label: "Volumen (ml)" },
        ],
      },
      {
        title: "Ovario Izquierdo",
        fields: [
          { id: "ovario-izquierdo-l1", label: "L1" },
          { id: "ovario-izquierdo-l2", label: "L2" },
          { id: "ovario-izquierdo-l3", label: "L3" },
          { id: "ovario-izquierdo-vol", label: "Volumen (ml)" },
        ],
      },
    ],
    renderReport: (v, pat) => (
      <>
        <PatientHeader values={v} />
        <p style={{ textAlign: "center", fontSize: "12pt" }}><b>SONOGRAFÍA PÉLVICA GINECOLÓGICA</b></p>
        <p>Utilizando equipo <b>General Electric</b> de última generación y transductor endocavitario de alta definición para la valoración, observamos:</p>
        <p><b>Útero:</b> En antero-versión, de tamaño adecuado, de bordes regulares y ecotextura homogénea, sin evidencia de imágenes quísticas, nodulares ni calcificaciones.</p>
        <p><b>Cavidad uterina:</b> Con endometrio trilaminar ecogénico, de {V(v, "cavidad-uterina")} cm de grosor.</p>
        <p><b>Medidas del útero:</b></p>
        <p><b>Longitudinal:</b> {V(v, "utero-longitudinal")} cm.<br /><b>Transversal:</b> {V(v, "utero-transversal")} cm.<br /><b>Antero-Posterior:</b> {V(v, "utero-anteroposterior")} cm.</p>
        <p><b>Orificio cervical interno:</b> Luce cerrado.</p>
        <p><b>ANEXOS:</b></p>
        <p><b>Ovario derecho:</b> {V(v, "ovario-derecho-l1")}x{V(v, "ovario-derecho-l2")}x{V(v, "ovario-derecho-l3")}cm. Vol: {V(v, "ovario-derecho-vol")}ml.<br /><b>Ovario izquierdo:</b> {V(v, "ovario-izquierdo-l1")}x{V(v, "ovario-izquierdo-l2")}x{V(v, "ovario-izquierdo-l3")}cm. Vol: {V(v, "ovario-izquierdo-vol")}ml.</p>
        <p><b>Ambos ovarios:</b> De ecopatrón conservado, de tamaño acorde a la edad, sin datos tumorales quísticos ni sólidos.</p>
        <p>No se observa colección de líquido en fondo de saco de Douglas.</p>
        <DiagnosticFooter values={v} patologia={pat} patologiaText="ESTUDIO SIN HALLAZGOS PATOLÓGICOS" />
      </>
    ),
  },
  {
    id: "gineco-vejiga",
    slug: "pelvica-ginecologica-vejiga",
    title: "Sonografía Pélvica Ginecológica + Vejiga",
    shortTitle: "Pélvica + Vejiga",
    icon: "💧",
    fieldGroups: [
      {
        title: "Cavidad Uterina",
        fields: [{ id: "cavidad-uterina", label: "Grosor (cm)" }],
      },
      {
        title: "Medidas del Útero",
        fields: [
          { id: "utero-longitudinal", label: "Longitud" },
          { id: "utero-transversal", label: "Transversal" },
          { id: "utero-anteroposterior", label: "Antero-Posterior" },
        ],
      },
      {
        title: "Ovarios",
        fields: [
          { id: "ovario-derecho-l1", label: "Ov. Der. L1" },
          { id: "ovario-derecho-l2", label: "Ov. Der. L2" },
          { id: "ovario-derecho-l3", label: "Ov. Der. L3" },
          { id: "ovario-derecho-vol", label: "Ov. Der. Vol (ml)" },
          { id: "ovario-izquierdo-l1", label: "Ov. Izq. L1" },
          { id: "ovario-izquierdo-l2", label: "Ov. Izq. L2" },
          { id: "ovario-izquierdo-l3", label: "Ov. Izq. L3" },
          { id: "ovario-izquierdo-vol", label: "Ov. Izq. Vol (ml)" },
        ],
      },
      {
        title: "Vejiga (Pre / Post)",
        fields: [
          { id: "vejiga-pre-l1", label: "Pre L1" },
          { id: "vejiga-pre-l2", label: "Pre L2" },
          { id: "vejiga-pre-l3", label: "Pre L3" },
          { id: "vejiga-pre-vol", label: "Pre Vol (ml)" },
          { id: "vejiga-post-l1", label: "Post L1" },
          { id: "vejiga-post-l2", label: "Post L2" },
          { id: "vejiga-post-l3", label: "Post L3" },
          { id: "vejiga-post-vol", label: "Post Vol (ml)" },
        ],
      },
    ],
    renderReport: (v, pat) => (
      <>
        <PatientHeader values={v} />
        <p style={{ textAlign: "center", fontSize: "12pt" }}><b>SONOGRAFÍA TRANSVAGINAL GINECOLÓGICA</b></p>
        <p>Utilizando equipo <b>General Electric</b> de última generación y transductor endocavitario de alta definición para la valoración, complementado con evaluación suprapúbica de la vejiga urinaria, observamos:</p>
        <p><b>Útero:</b> En ante-versión, de tamaño adecuado, de contornos regulares y ecotextura homogénea, sin evidencia de imágenes nodulares ni lesiones focales.</p>
        <p><b>Cavidad uterina:</b> Con endometrio de aspecto ecográfico conservado, de {V(v, "cavidad-uterina")} cm de grosor.</p>
        <p><b>Medidas del útero:</b></p>
        <p><b>Longitudinal:</b> {V(v, "utero-longitudinal")} cm.<br /><b>Transversal:</b> {V(v, "utero-transversal")} cm.<br /><b>Antero-Posterior:</b> {V(v, "utero-anteroposterior")} cm.</p>
        <p><b>Orificio cervical interno:</b> Luce cerrado.</p>
        <p><b>VEJIGA URINARIA:</b> Se muestra con adecuada distensión, sin presencia de masas intravesicales, sin engrosamiento de sus paredes ni evidencia de calcificaciones.</p>
        <p><b>PRE-MICCIÓN</b> {V(v, "vejiga-pre-l1")}x{V(v, "vejiga-pre-l2")}x{V(v, "vejiga-pre-l3")}cm. Vol: {V(v, "vejiga-pre-vol")}ml.<br /><b>POST-MICCIÓN</b> {V(v, "vejiga-post-l1")}x{V(v, "vejiga-post-l2")}x{V(v, "vejiga-post-l3")}cm. Vol: {V(v, "vejiga-post-vol")}ml.</p>
        <p><b>Residuo postmiccional:</b> {V(v, "vejiga-post-vol")}ml.</p>
        <p>No se observa colección de líquido en fondo de saco de Douglas.</p>
        <DiagnosticFooter values={v} patologia={pat} patologiaText="ESTUDIO SIN HALLAZGOS PATOLÓGICOS" />
      </>
    ),
  },
  {
    id: "prostatica",
    slug: "pelvica-prostatica",
    title: "Sonografía Pélvica Prostática",
    shortTitle: "Prostática",
    icon: "🔬",
    fieldGroups: [
      {
        title: "Próstata",
        fields: [
          { id: "prostata-longitudinal", label: "Longitud" },
          { id: "prostata-transversal", label: "Transversal" },
          { id: "prostata-anteroposterior", label: "Antero-Posterior" },
          { id: "prostata-vol", label: "Volumen (ml)" },
        ],
      },
      {
        title: "Vejiga (Pre / Post)",
        fields: [
          { id: "vejiga-pre-l1", label: "Pre L1" },
          { id: "vejiga-pre-l2", label: "Pre L2" },
          { id: "vejiga-pre-l3", label: "Pre L3" },
          { id: "vejiga-pre-vol", label: "Pre Vol (ml)" },
          { id: "vejiga-post-l1", label: "Post L1" },
          { id: "vejiga-post-l2", label: "Post L2" },
          { id: "vejiga-post-l3", label: "Post L3" },
          { id: "vejiga-post-vol", label: "Post Vol (ml)" },
        ],
      },
    ],
    renderReport: (v, pat) => (
      <>
        <PatientHeader values={v} />
        <p style={{ textAlign: "center", fontSize: "12pt" }}><b>SONOGRAFÍA PÉLVICA PROSTÁTICA</b></p>
        <p>Utilizando equipo <b>General Electric</b> de última generación y transductor convexo de alta resolución, observamos:</p>
        <p><b>PRÓSTATA:</b> Glándula prostática de contornos regulares, con zonas central y periférica conservadas en ecogenicidad y volumen, sin evidencia de lesiones quísticas ni sólidas.</p>
        <p><b>Medidas prostáticas:</b></p>
        <p><b>Longitudinal:</b> {V(v, "prostata-longitudinal")} cm.<br /><b>Transversal:</b> {V(v, "prostata-transversal")} cm.<br /><b>Antero-Posterior:</b> {V(v, "prostata-anteroposterior")} cm.<br /><b>Volumen prostático:</b> {V(v, "prostata-vol")} cm.</p>
        <p><b>VEJIGA URINARIA:</b> Se muestra con adecuada distensión, sin presencia de masas intravesicales, sin engrosamiento de sus paredes ni evidencia de calcificaciones.</p>
        <p><b>PRE-MICCIÓN</b> {V(v, "vejiga-pre-l1")}x{V(v, "vejiga-pre-l2")}x{V(v, "vejiga-pre-l3")}cm. Vol: {V(v, "vejiga-pre-vol")}ml.<br /><b>POST-MICCIÓN</b> {V(v, "vejiga-post-l1")}x{V(v, "vejiga-post-l2")}x{V(v, "vejiga-post-l3")}cm. Vol: {V(v, "vejiga-post-vol")}ml.</p>
        <p><b>Residuo postmiccional:</b> {V(v, "vejiga-post-vol")}ml.</p>
        <p>No se observa colección de líquido en fondo de saco de Douglas.</p>
        <DiagnosticFooter values={v} patologia={pat} patologiaText="ESTUDIO SIN HALLAZGOS PATOLÓGICOS" />
      </>
    ),
  },
  {
    id: "transvaginal",
    slug: "transvaginal",
    title: "Sonografía Transvaginal",
    shortTitle: "Transvaginal",
    icon: "🏥",
    fieldGroups: [
      {
        title: "Cavidad Uterina",
        fields: [{ id: "cavidad-uterina", label: "Grosor (cm)" }],
      },
      {
        title: "Medidas del Útero",
        fields: [
          { id: "utero-longitudinal", label: "Longitud" },
          { id: "utero-transversal", label: "Transversal" },
          { id: "utero-anteroposterior", label: "Antero-Posterior" },
        ],
      },
      {
        title: "Ovario Derecho",
        fields: [
          { id: "ovario-derecho-l1", label: "L1" },
          { id: "ovario-derecho-l2", label: "L2" },
          { id: "ovario-derecho-l3", label: "L3" },
          { id: "ovario-derecho-vol", label: "Volumen (ml)" },
        ],
      },
      {
        title: "Ovario Izquierdo",
        fields: [
          { id: "ovario-izquierdo-l1", label: "L1" },
          { id: "ovario-izquierdo-l2", label: "L2" },
          { id: "ovario-izquierdo-l3", label: "L3" },
          { id: "ovario-izquierdo-vol", label: "Volumen (ml)" },
        ],
      },
    ],
    renderReport: (v, pat) => (
      <>
        <PatientHeader values={v} />
        <p style={{ textAlign: "center", fontSize: "12pt" }}><b>SONOGRAFÍA TRANSVAGINAL GINECOLÓGICA</b></p>
        <p>Utilizando equipo <b>General Electric</b> de última generación y transductor endocavitario de alta definición para la valoración, observamos:</p>
        <p><b>Útero:</b> En ante-versión, de tamaño adecuado, de contornos regulares y ecotextura homogénea, sin evidencia de imágenes nodulares ni lesiones focales.</p>
        <p><b>Cavidad uterina:</b> Con endometrio de aspecto ecográfico conservado, de {V(v, "cavidad-uterina")} cm de grosor.</p>
        <p><b>Medidas del útero:</b></p>
        <p><b>Longitudinal:</b> {V(v, "utero-longitudinal")} cm.<br /><b>Transversal:</b> {V(v, "utero-transversal")} cm.<br /><b>Antero-Posterior:</b> {V(v, "utero-anteroposterior")} cm.</p>
        <p><b>Orificio cervical interno:</b> Luce cerrado.</p>
        <p><b>ANEXOS:</b></p>
        <p><b>Ovario derecho:</b> {V(v, "ovario-derecho-l1")}x{V(v, "ovario-derecho-l2")}x{V(v, "ovario-derecho-l3")}cm. Vol: {V(v, "ovario-derecho-vol")}ml.<br /><b>Ovario izquierdo:</b> {V(v, "ovario-izquierdo-l1")}x{V(v, "ovario-izquierdo-l2")}x{V(v, "ovario-izquierdo-l3")}cm. Vol: {V(v, "ovario-izquierdo-vol")}ml.</p>
        <p><b>Ambos ovarios:</b> De ecopatrón conservado, sin evidencia de lesiones quísticas ni sólidas.</p>
        <p><b>ARTERIAS CARÓTIDAS Y VENAS YUGULARES:</b> Lucen forma y calibre normal.</p>
        <p>No se observa colección de líquido en fondo de saco de Douglas.</p>
        <DiagnosticFooter values={v} patologia={pat} patologiaText="ESTUDIO SIN HALLAZGOS PATOLÓGICOS" />
      </>
    ),
  },
];
