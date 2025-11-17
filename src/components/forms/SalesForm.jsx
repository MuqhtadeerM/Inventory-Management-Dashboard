import { useState } from "react";
import Button from "../../components/common/Button";
import SectionCard from "../../components/common/SectionCard";
import Input from "../../components//common/Input";
import { Search, Trash2 } from "lucide-react";
import Select from "../common/Section";

const SalesForm = ({ onClose, onSave }) => {
  const [saleData, setSaleData] = useState({
    date: "17-11-2025",
    outlet: "",
    route: "",
    paidAmount: "0",
  });

  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProductList, setShowProductList] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Mock product data
  const mockProducts = [
    { id: 1, name: "Coca-Cola 500ml", uom: "Bottle", price: 40, gst: 12 },
    { id: 2, name: "Sprite 500ml", uom: "Bottle", price: 40, gst: 12 },
    { id: 3, name: "Fanta 500ml", uom: "Bottle", price: 40, gst: 12 },
    { id: 4, name: "Thumsup 500ml", uom: "Bottle", price: 45, gst: 12 },
    { id: 5, name: "Limca 500ml", uom: "Bottle", price: 40, gst: 12 },
  ];

  const outletOptions = [
    { value: "City Mart", label: "City Mart" },
    { value: "Super Store", label: "Super Store" },
    { value: "Mini Market", label: "Mini Market" },
  ];

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filtered = mockProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowProductList(true);
    } else {
      setShowProductList(false);
    }
  };

  const handleProductSelect = (product) => {
    const newItem = {
      id: Date.now(),
      productId: product.id,
      product: product.name,
      uom: product.uom,
      qty: 1,
      price: product.price,
      disc: 0,
      gst: product.gst,
      total: product.price,
    };
    setItems([...items, newItem]);
    setSearchQuery("");
    setShowProductList(false);
  };

  const handleItemChange = (id, field, value) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };

          const qty = parseFloat(updatedItem.qty) || 0;
          const price = parseFloat(updatedItem.price) || 0;
          const disc = parseFloat(updatedItem.disc) || 0;
          const gst = parseFloat(updatedItem.gst) || 0;

          const subtotal = qty * price;
          const discountAmount = subtotal * (disc / 100);
          const afterDiscount = subtotal - discountAmount;
          const gstAmount = afterDiscount * (gst / 100);
          updatedItem.total = (afterDiscount + gstAmount).toFixed(2);

          return updatedItem;
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateTotals = () => {
    const subtotal = items.reduce(
      (sum, item) => sum + parseFloat(item.total || 0),
      0
    );
    return subtotal.toFixed(2);
  };

  const handleSubmit = () => {
    const saleRecord = {
      ...saleData,
      items,
      total: calculateTotals(),
    };
    onSave?.(saleRecord);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full h-full max-h-screen overflow-auto bg-white rounded-lg shadow-xl md:max-w-6xl md:h-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b md:p-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
              Add Sale
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Fill in the sale details
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleSubmit}>
              Save Sale
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-6 md:p-6">
          {/* Sale Information */}
          <SectionCard title="Sale Information">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Input
                label="Date"
                type="text"
                value={saleData.date}
                onChange={(e) =>
                  setSaleData({ ...saleData, date: e.target.value })
                }
                className="bg-gray-100"
              />
              <Select
                label="Outlet"
                value={saleData.outlet}
                onChange={(e) =>
                  setSaleData({ ...saleData, outlet: e.target.value })
                }
                options={outletOptions}
                placeholder="Select outlet"
                required
              />
              <Input
                label="Route"
                type="text"
                value={saleData.route}
                onChange={(e) =>
                  setSaleData({ ...saleData, route: e.target.value })
                }
                placeholder="Auto-filled from outlet"
                disabled
              />
              <Input
                label="Paid Amount (₹)"
                type="number"
                value={saleData.paidAmount}
                onChange={(e) =>
                  setSaleData({ ...saleData, paidAmount: e.target.value })
                }
              />
            </div>
          </SectionCard>

          {/* Items Section */}
          <SectionCard title="Items">
            {/* Search Bar */}
            <div className="relative mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Scan barcode or type product code and press Enter"
                  className="w-full px-3 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-3 top-1/2" />
              </div>

              {/* Product Dropdown */}
              {showProductList && filteredProducts.length > 0 && (
                <div className="absolute z-20 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-lg shadow-lg max-h-60">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                    >
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.uom} - ₹{product.price}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-xs font-medium text-left text-gray-500 uppercase md:px-4 md:py-3">
                      Product
                    </th>
                    <th className="px-3 py-2 text-xs font-medium text-left text-gray-500 uppercase md:px-4 md:py-3">
                      UOM
                    </th>
                    <th className="px-3 py-2 text-xs font-medium text-left text-gray-500 uppercase md:px-4 md:py-3">
                      Qty
                    </th>
                    <th className="px-3 py-2 text-xs font-medium text-left text-gray-500 uppercase md:px-4 md:py-3">
                      Price
                    </th>
                    <th className="px-3 py-2 text-xs font-medium text-left text-gray-500 uppercase md:px-4 md:py-3">
                      Disc%
                    </th>
                    <th className="px-3 py-2 text-xs font-medium text-left text-gray-500 uppercase md:px-4 md:py-3">
                      GST%
                    </th>
                    <th className="px-3 py-2 text-xs font-medium text-left text-gray-500 uppercase md:px-4 md:py-3">
                      Total
                    </th>
                    <th className="px-3 py-2 text-xs font-medium text-left text-gray-500 uppercase md:px-4 md:py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="px-4 py-8 text-sm text-center text-gray-500"
                      >
                        No items added. Scan or search products to add.
                      </td>
                    </tr>
                  ) : (
                    items.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-sm text-gray-900 md:px-4 md:py-3">
                          {item.product}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-900 md:px-4 md:py-3">
                          {item.uom}
                        </td>
                        <td className="px-3 py-2 md:px-4 md:py-3">
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) =>
                              handleItemChange(item.id, "qty", e.target.value)
                            }
                            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded md:w-20"
                            min="1"
                          />
                        </td>
                        <td className="px-3 py-2 md:px-4 md:py-3">
                          <input
                            type="number"
                            value={item.price}
                            onChange={(e) =>
                              handleItemChange(item.id, "price", e.target.value)
                            }
                            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded md:w-24"
                          />
                        </td>
                        <td className="px-3 py-2 md:px-4 md:py-3">
                          <input
                            type="number"
                            value={item.disc}
                            onChange={(e) =>
                              handleItemChange(item.id, "disc", e.target.value)
                            }
                            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded md:w-20"
                            min="0"
                            max="100"
                          />
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-900 md:px-4 md:py-3">
                          {item.gst}%
                        </td>
                        <td className="px-3 py-2 text-sm font-semibold text-gray-900 md:px-4 md:py-3">
                          ₹{item.total}
                        </td>
                        <td className="px-3 py-2 md:px-4 md:py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            icon={Trash2}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Total Summary */}
            {items.length > 0 && (
              <div className="flex justify-end mt-4">
                <div className="w-full p-4 space-y-2 rounded-lg bg-gray-50 md:w-80">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Items:</span>
                    <span className="font-semibold">{items.length}</span>
                  </div>
                  <div className="flex justify-between pt-2 text-base border-t border-gray-300">
                    <span className="font-semibold text-gray-900">
                      Grand Total:
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      ₹{calculateTotals()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default SalesForm;
