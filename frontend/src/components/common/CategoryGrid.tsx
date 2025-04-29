import React from "react";
import CategoryCard from "./CategoryCard";
import aiArtists from "@/assets/categories/ai-artists-2x.jpg";
import logoDesign from "@/assets/categories/logo-design-2x.jpg";
import social from "@/assets/categories/social-2x.jpg";
import translation from "@/assets/categories/translation-2x.jpg";
import voiceover from "@/assets/categories/voice-over-2x.jpg";
import wordpress from "@/assets/categories/wordpress-2x.jpg";
import { motion } from "framer-motion";
import { ICategory } from "@/types/ICategory";

const categoryImages: { [key: string]: string } = {
    "Software development": aiArtists,
    Designing: logoDesign,
    Art: social,
    Translation: translation,
    Voiceover: voiceover,
    "Sales and Marketing": wordpress,
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const CategoryGrid: React.FC = () => {
    const categories: ICategory[] = [
        { _id: '1', name: "Software development", subCategory: [] },
        { _id: '2', name: "Designing", subCategory: [] },
        { _id: '3', name: "Art", subCategory: [] },
        { _id: '4', name: "Sales and Marketing", subCategory: [] },
        { _id: '5', name: "Translation", subCategory: [] },
        { _id: '6', name: "Voiceover", subCategory: [] },
    ];

    const getCategoryImage = (categoryName: string) => {
        return categoryImages[categoryName] || categoryImages.default;
    };

    return (
        <section className="py-12">
            <motion.div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-6 gap-6 justify-center items-center" variants={container} initial="hidden" animate="show">
                {categories?.map((category, index) => (
                    <CategoryCard key={category._id} category={category} image={getCategoryImage(category.name)} index={index} />
                ))}
            </motion.div>
        </section>
    );
};

export default CategoryGrid;
