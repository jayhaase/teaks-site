import Image from "@11ty/eleventy-img";

const imageOptions = {
  widths: [400, 800, 1200],
  formats: ["avif", "webp", "jpeg"],
  outputDir: "./_site/images/optimized/",
  urlPath: "images/optimized/",
};

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy({ public: "/" });

  eleventyConfig.addCollection("sections", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("content/sections/*.md")
      .sort((a, b) => a.data.order - b.data.order),
  );

  eleventyConfig.addNunjucksAsyncShortcode(
    "image",
    async function (src, alt, sizes = "100vw", focal) {
      if (!alt) {
        throw new Error(`Missing alt text for image: ${src}`);
      }
      const metadata = await Image(`./images/${src}`, imageOptions);
      const attributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
      };
      if (focal) {
        attributes.style = `--focal: ${focal};`;
      }
      return Image.generateHTML(metadata, attributes);
    },
  );

  // Full-size (largest jpeg) URL for a gallery image, used by the lightbox.
  // Uses the same options as the `image` shortcode so it hits eleventy-img's
  // on-disk cache instead of re-processing the file.
  eleventyConfig.addNunjucksAsyncShortcode("imageUrl", async function (src) {
    const metadata = await Image(`./images/${src}`, imageOptions);
    const variants = metadata.jpeg;
    return variants[variants.length - 1].url;
  });

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
