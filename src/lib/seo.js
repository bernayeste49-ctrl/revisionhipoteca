// JSON-LD de artículo para las guías
export function articleLd({ title, description, path, updated }) {
  return {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: title, description, inLanguage: 'es-ES',
    mainEntityOfPage: `https://revisionhipoteca.es${path}`,
    datePublished: '2026-11-23', dateModified: updated,
    author: { '@type': 'Person', name: 'Bernat Yeste', url: 'https://revisionhipoteca.es/sobre-nosotros/' },
    publisher: { '@type': 'Organization', name: 'Revisión Hipoteca', url: 'https://revisionhipoteca.es/' },
    image: 'https://revisionhipoteca.es/og.png',
  };
}
export function faqLd(faqs) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
}
