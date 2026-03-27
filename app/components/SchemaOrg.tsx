type WebSiteSchema = {
  type: "WebSite";
};

type ArticleSchema = {
  type: "Article";
  title: string;
  description: string;
  datePublished?: string;
  url: string;
};

type Props = WebSiteSchema | ArticleSchema;

export default function SchemaOrg(props: Props) {
  let schema: object;

  if (props.type === "WebSite") {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Maks Biderman",
      url: "https://maxbiderman.pl",
      description:
        "Piszę o digital marketingu, organizuję wiedzę i agreguje ciekawe narzędzia.",
      author: {
        "@type": "Person",
        name: "Maksymilian Biderman",
        url: "https://www.linkedin.com/in/maksymilian-biderman/",
      },
    };
  } else {
    schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: props.title,
      description: props.description,
      ...(props.datePublished ? { datePublished: props.datePublished } : {}),
      url: props.url,
      author: {
        "@type": "Person",
        name: "Maksymilian Biderman",
        url: "https://www.linkedin.com/in/maksymilian-biderman/",
      },
      publisher: {
        "@type": "Person",
        name: "Maksymilian Biderman",
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
