import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Blog = () => {
  const { t } = useTranslation();
  return (
    <div>
      <section>
        {/* Container */}
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
          {/* Component */}
          <div className="flex flex-col items-center">
            <h2 className="text-center text-3xl font-bold md:text-5xl">
              {t("blogComponent.title")}
            </h2>
            <p className="mb-8 mt-4 text-center text-sm text-gray-500 sm:text-base md:mb-12 lg:mb-16">
              {t("blogComponent.description")}
            </p>
            {/* Content */}
            <div className="mb-8 grid gap-5 sm:grid-cols-2 sm:justify-items-stretch md:mb-12 md:grid-cols-3 lg:mb-16 lg:gap-6">
              {/* Item */}
              <a
                href="https://www.bbc.com/news/uk-wales-50508549"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-4 rounded-md px-4 py-8 md:p-0"
              >
                <img
                  src="https://ichef.bbci.co.uk/news/1024/cpsprodpb/182FF/production/_107317099_blooddonor976.jpg.webp"
                  alt="Blood Donation Awareness"
                  className="h-60 object-cover"
                />
                <div className="flex flex-col items-start py-4">
                  <div className="mb-4 rounded-md bg-gray-100 px-2 py-1.5">
                    <p className="text-sm font-semibold text-blue-600">
                      {t("blogComponent.categories.awareness")}
                    </p>
                  </div>
                  <p className="mb-4 text-xl font-bold md:text-2xl">
                    {t("blogComponent.blogs.blog1.title")}
                  </p>
                  <div className="flex flex-col items-start text-sm text-gray-500 lg:flex-row lg:items-center">
                    <p>{t("blogComponent.blogs.blog1.author")}</p>
                    <p className="mx-2 hidden lg:block">-</p>
                    <p>{t("blogComponent.blogs.blog1.readTime")}</p>
                  </div>
                </div>
              </a>
              {/* Item */}
              <a
                href="https://www.theborneopost.com/2023/06/18/health-ministry-targets-national-blood-donation-rate-of-35-to-40-donors-per-1000-population-by-2030/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-4 rounded-md px-4 py-8 md:p-0"
              >
                <img
                  src="https://www.theborneopost.com/newsimages/2023/06/blood-donation.jpg"
                  alt="Blood Donation Drive"
                  className="h-60 object-cover"
                />
                <div className="flex flex-col items-start py-4">
                  <div className="mb-4 rounded-md bg-gray-100 px-2 py-1.5">
                    <p className="text-sm font-semibold text-blue-600">
                      {t("blogComponent.categories.communityInitiatives")}
                    </p>
                  </div>
                  <p className="mb-4 text-xl font-bold md:text-2xl">
                    {t("blogComponent.blogs.blog2.title")}
                  </p>
                  <div className="flex flex-col items-start text-sm text-gray-500 lg:flex-row lg:items-center">
                    <p>{t("blogComponent.blogs.blog2.author")}</p>
                    <p className="mx-2 hidden lg:block">-</p>
                    <p>{t("blogComponent.blogs.blog2.readTime")}</p>
                  </div>
                </div>
              </a>
              {/* Item */}
              <a
                href="https://www.healthline.com/health/benefits-of-donating-blood"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-4 rounded-md px-4 py-8 md:p-0"
              >
                <img
                  src="https://media.post.rvohealth.io/wp-content/uploads/2020/09/Blood_Donation-732X549-thumbnail-732x549.jpg"
                  alt="Blood Donation Stories"
                  className="h-60 object-cover"
                />
                <div className="flex flex-col items-start py-4">
                  <div className="mb-4 rounded-md bg-gray-100 px-2 py-1.5">
                    <p className="text-sm font-semibold text-blue-600">
                      {t("blogComponent.categories.personalStories")}
                    </p>
                  </div>
                  <p className="mb-4 text-xl font-bold md:text-2xl">
                    {t("blogComponent.blogs.blog3.title")}
                  </p>
                  <div className="flex flex-col items-start text-sm text-gray-500 lg:flex-row lg:items-center">
                    <p>{t("blogComponent.blogs.blog3.author")}</p>
                    <p className="mx-2 hidden lg:block">-</p>
                    <p>{t("blogComponent.blogs.blog3.readTime")}</p>
                  </div>
                </div>
              </a>
            </div>
            {/* Button */}
            <Link
              to="/blogs"
              className="rounded-md bg-black px-6 py-3 text-center font-semibold text-white"
            >
              {t("blogComponent.viewMore")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
