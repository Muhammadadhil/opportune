import React from "react";
import { ICategory } from "../../types/ICategory";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface CategoryCardProps {
    category: ICategory;
    image: string;
    index: number;
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category, image, index }) => {
    const navigate = useNavigate();

    const handleNavigate = (categoryName: string) => {
        navigate("/explore", { state: { selectedCategory: categoryName } });
    };

    return (
        <motion.div
            variants={item}
            className="group relative overflow-hidden rounded-xl transition-all hover:shadow-xl cursor-pointer"
            onClick={() => handleNavigate(category.name)}
            whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
            }}
        >
            <div className="aspect-square w-full overflow-hidden">
                <motion.img
                    src={image}
                    alt={category.name}
                    className="h-full w-full object-cover"
                    whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.4 },
                    }}
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <motion.div className="absolute bottom-0 p-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}>
                    <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">{category.name}</h3>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default CategoryCard;
