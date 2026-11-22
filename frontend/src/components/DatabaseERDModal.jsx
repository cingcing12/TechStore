import React, { useState } from 'react';
import { X, Database, Table, Key, ArrowRight, Copy, Check, Info } from 'lucide-react';
import { DATABASE_SCHEMA } from '../data/products';

export default function DatabaseERDModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('erd'); // 'erd' or 'sql'

  if (!isOpen) return null;

  const sqlCode = `-- E-Commerce Database Schema (PDF Practical Exercise Database Design)
-- Tables: Customers, Categories, Products, Orders, Order_Items

CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE CASCADE
);

CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_code VARCHAR(50) UNIQUE NOT NULL,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    subtotal DECIMAL(10, 2) NOT NULL,
    shipping_fee DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_method VARCHAR(50) NOT NULL,
    order_status VARCHAR(50) DEFAULT 'Pending',
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE RESTRICT
);

CREATE TABLE Order_Items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL,
    total_line_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE RESTRICT
);
`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/30 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs text-indigo-300 font-semibold mb-0.5">
                <span>PDF Page 4 • Practical Exercise Database Design</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                E-Commerce Order Database (ERD & Architecture)
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="bg-slate-800/80 p-1 rounded-xl flex items-center text-xs font-semibold">
              <button
                onClick={() => setActiveTab('erd')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'erd' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                Visual ERD & Tables
              </button>
              <button
                onClick={() => setActiveTab('sql')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'sql' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                SQL Schema DDL
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'erd' ? (
            <>
              {/* Context Alert */}
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200/80 flex items-start space-x-3 text-xs text-indigo-950">
                <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Task: ចូរគូរ ERD ដើម្បីបង្ហាញទំនាក់ទំនងរវាង Tables ទាំងនេះ៖</strong>
                  <p className="mt-0.5 text-indigo-800">
                    Below is the interactive relational database model connecting <strong>1. Customers</strong>, <strong>2. Categories</strong>, <strong>3. Products</strong>, <strong>4. Orders</strong>, and <strong>5. Order_Items</strong> with Primary Keys (PK) and Foreign Keys (FK).
                  </p>
                </div>
              </div>

              {/* ERD Relationship Flow Diagram */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 overflow-x-auto">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">
                  Entity Relationship Diagram (ERD Flow)
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 min-w-[650px] py-4">
                  {/* Categories Box */}
                  <div className="p-4 rounded-xl bg-slate-800/90 border border-indigo-500/40 w-44 text-center shadow-lg">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase">Lookup Table</span>
                    <h4 className="text-sm font-extrabold text-white mt-1">Categories</h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">PK: category_id</p>
                  </div>

                  <div className="flex flex-col items-center text-indigo-400 text-xs font-mono">
                    <span className="text-[10px]">1 : N</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>

                  {/* Products Box */}
                  <div className="p-4 rounded-xl bg-blue-950/80 border border-blue-500/50 w-48 text-center shadow-lg ring-2 ring-blue-500/20">
                    <span className="text-[10px] font-mono text-blue-300 uppercase">Inventory</span>
                    <h4 className="text-sm font-extrabold text-white mt-1">Products</h4>
                    <p className="text-[10px] text-slate-300 font-mono mt-0.5">PK: product_id</p>
                    <p className="text-[10px] text-amber-300 font-mono">FK: category_id</p>
                  </div>

                  <div className="flex flex-col items-center text-blue-400 text-xs font-mono">
                    <span className="text-[10px]">1 : N</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>

                  {/* Order_Items Box */}
                  <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 w-52 text-center shadow-lg ring-2 ring-emerald-500/20">
                    <span className="text-[10px] font-mono text-emerald-300 uppercase">Junction Bridge</span>
                    <h4 className="text-sm font-extrabold text-white mt-1">Order_Items</h4>
                    <p className="text-[10px] text-slate-300 font-mono mt-0.5">PK: order_item_id</p>
                    <p className="text-[10px] text-amber-300 font-mono">FK: order_id, product_id</p>
                  </div>

                  <div className="flex flex-col items-center text-teal-400 text-xs font-mono">
                    <span className="text-[10px]">N : 1</span>
                    <span className="rotate-180 md:rotate-0"><ArrowRight className="w-5 h-5" /></span>
                  </div>

                  {/* Orders Box */}
                  <div className="p-4 rounded-xl bg-purple-950/80 border border-purple-500/50 w-48 text-center shadow-lg">
                    <span className="text-[10px] font-mono text-purple-300 uppercase">Transactions</span>
                    <h4 className="text-sm font-extrabold text-white mt-1">Orders</h4>
                    <p className="text-[10px] text-slate-300 font-mono mt-0.5">PK: order_id</p>
                    <p className="text-[10px] text-amber-300 font-mono">FK: customer_id</p>
                  </div>

                  <div className="flex flex-col items-center text-purple-400 text-xs font-mono">
                    <span className="text-[10px]">N : 1</span>
                    <span className="rotate-180 md:rotate-0"><ArrowRight className="w-5 h-5" /></span>
                  </div>

                  {/* Customers Box */}
                  <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 w-44 text-center shadow-lg">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">User Accounts</span>
                    <h4 className="text-sm font-extrabold text-white mt-1">Customers</h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">PK: customer_id</p>
                  </div>
                </div>
              </div>

              {/* Table Schema Cards */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center space-x-2">
                  <Table className="w-4 h-4 text-blue-600" />
                  <span>5 Core Tables Schema Breakdown</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DATABASE_SCHEMA.tables.map((tbl) => (
                    <div
                      key={tbl.name}
                      className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm text-slate-900 font-mono">
                            {tbl.name}
                          </span>
                          <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">
                            {tbl.columns.length} columns
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          PK: {tbl.primaryKey}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 my-2">
                        {tbl.description}
                      </p>

                      <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
                        {tbl.columns.map((col) => (
                          <div
                            key={col.name}
                            className="flex items-center justify-between py-1 px-2 rounded bg-slate-50 text-[11px] font-mono"
                          >
                            <div className="flex items-center space-x-1.5">
                              {col.isPK && (
                                <Key className="w-3 h-3 text-amber-500 fill-amber-500" title="Primary Key" />
                              )}
                              {col.isFK && (
                                <span className="w-2 h-2 rounded-full bg-blue-500" title={`Foreign Key to ${col.foreignTable}`}></span>
                              )}
                              <span className="font-semibold text-slate-800">{col.name}</span>
                            </div>
                            <span className="text-slate-400 text-[10px]">{col.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  Standard SQL DDL ready to execute in MySQL / PostgreSQL / SQLite
                </span>
                <button
                  onClick={handleCopySql}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy SQL</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                <code>{sqlCode}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Database ERD matches all requirements in Slide 29 of the curriculum.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
