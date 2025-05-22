
interface CategorySelectorProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export function CategorySelector({
    categories,
    selectedCategory,
    onCategoryChange
}: CategorySelectorProps) {
    return (
        <div className="category-selector">
            <label htmlFor="category-select" className="category-selector-label">
                Filter by category:
            </label>
            <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="category-selector-dropdown"
            >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
}