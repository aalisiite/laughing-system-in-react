import { useState } from "react";
import response from "./response.json";


function ProductCategoryRow({ category }) {
    return (
        <tr>
            <th colSpan="2">
                {category}
            </th>
        </tr>
    );
}

function ProductRow({ product }) {
    const name = product.stocked ? product.name :
        <span className="out-of-stock">
            {product.name}
        </span>
    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    )
}

function SearchBar({ filterText, inStock, onFilterTextChange, onInStockChange }) {
    return (
        <form>
            <input type="text" placeholder="Search..." value={filterText}
                onChange={(e) => onFilterTextChange(e.target.value)} />
            {/* use onChange event handlers and set the parent state from them */}
            <label>
                <input type="checkbox" checked={inStock}
                    onChange={(e) => onInStockChange(e.target.checked)} />
                {' '}
                Only show products in stock.
            </label>
        </form>
    )
}

function PricingTable({ products, filterText, inStock }) {
    const rows = [];
    let lastCategory = null;
    products.forEach(product => {
        if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            return;
        }

        if (inStock && !product.stocked) {
            return;
        }

        if (product.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow category={product.category} key={product.category} />
            );
        };

        rows.push(
            <ProductRow product={product} key={product.name} />
        );

        lastCategory = product.category;
    })
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

export default function FilterableProductTable() {
    const [filterText, setFilterText] = useState("");
    const [inStock, setInStock] = useState(false);
    return (
        <>
            <SearchBar filterText={filterText} inStock={inStock}
                onFilterTextChange={setFilterText} onInStockChange={setInStock} />
            <PricingTable products={response} filterText={filterText} inStock={inStock} />
        </>
    );
}