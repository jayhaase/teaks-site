import Image from "@11ty/eleventy-img";

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy({ public: "/" });

  eleventyConfig.addCollection("sections", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("content/sections/*.md")
      .sort((a, b) => a.data.order - b.data.order),
  );

  eleventyConfig.addNunjucksAsyncShortcode(
    "image",
    async function (src, alt, sizes = "100vw") {
      if (!alt) {
        throw new Error(`Missing alt text for image: ${src}`);
      }
      const metadata = await Image(`./images/${src}`, {
        widths: [400, 800, 1200],
        formats: ["avif", "webp", "jpeg"],
        outputDir: "./_site/images/optimized/",
        urlPath: "/images/optimized/",
      });
      return Image.generateHTML(metadata, {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
      });
    },
  );

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
}
