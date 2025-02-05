"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { font } from "../font/poppins";
import { useColor } from "../../context/ColorContext";
import { MdOutlineInventory2 } from "react-icons/md";
import { LuPackage } from "react-icons/lu";
import { RiCustomerServiceFill } from "react-icons/ri";
import { GiShoppingCart } from "react-icons/gi";

const Sidebar = () => {
  const { primaryColor } = useColor();
  const [activeTab, setActiveTab] = useState("");
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isBankingOpen, setIsBankingOpen] = useState(false);
  const [isSaleOpen, setIsSaleOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isApprovalOpen, setIsApprovalOpen] = useState(false);

  const colorMap = {
    administration: "#A25FAD",
    sales: "#ED8C37",
    purchase: "#82AA28",
    inventory: "#E86184",
    banking: "#C55D57",
    service: "#51A885",
  };

  useEffect(() => {
    const path = window.location.pathname;
    setActiveTab(path); 

    setIsInventoryOpen(localStorage.getItem("isInventoryOpen") === "true");
    setIsPurchaseOpen(localStorage.getItem("isPurchaseOpen") === "true");
    setIsSaleOpen(localStorage.getItem("isSaleOpen") === "true");
    setIsServiceOpen(localStorage.getItem("isServiceOpen") === "true");
    setIsApprovalOpen(localStorage.getItem("isApprovalOpen") === "true");
    setIsBankingOpen(localStorage.getItem("isBankingOpen") === "true");
  }, []);

  const toggleTabState = (tab, setOpen) => {
    const newState = !setOpen;
    localStorage.setItem(tab, newState);
    return newState;
  };

  const renderLink = (href, Icon, label, subLink = false, module) => {
    const isHomeTab = href === "/dashboard"; // Change "/dashboard" if your Home path is different.
  
    return (
      <Link href={href}>
        <p
          className={`flex items-center py-2 px-4 mt-2 rounded transition duration-200 ${subLink ? "ml-6" : ""}`}
          style={{
            borderLeft: `4px solid ${colorMap[module] || primaryColor}`,
            color: activeTab === href ? (isHomeTab ? "white" : colorMap[module]) : "black",
            backgroundColor: activeTab === href
              ? isHomeTab
                ? primaryColor
                : "#e0e0e0"
              : "transparent",
          }}
          onClick={() => setActiveTab(href)}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isHomeTab ? primaryColor : "#f0f0f0";
            e.currentTarget.style.color = isHomeTab ? "white" : colorMap[module];
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = activeTab === href
              ? isHomeTab
                ? primaryColor
                : "#e0e0e0"
              : "transparent";
            e.currentTarget.style.color = activeTab === href ? (isHomeTab ? "white" : colorMap[module]) : "black";
          }}
        >
          {Icon && <Icon size={"24px"} color={activeTab === href ? (isHomeTab ? "white" : colorMap[module]) : "black"} />}
          &nbsp;&nbsp;{label}
        </p>
      </Link>
    );
  };
  
  

  const renderHeading = (icon, label, toggleFunc, isOpen, module, modulePaths) => (
    <p
      className="flex items-center py-2 px-4 rounded cursor-pointer transition duration-200"
      style={{
        backgroundColor: modulePaths.includes(activeTab) ? colorMap[module] : "transparent",
        color: modulePaths.includes(activeTab) ? "white" : "black",
      }}
      onClick={toggleFunc}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colorMap[module];
        e.currentTarget.style.color = "white";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = modulePaths.includes(activeTab) ? colorMap[module] : "transparent";
        e.currentTarget.style.color = modulePaths.includes(activeTab) ? "white" : "black";
      }}
    >
      {icon}
      &nbsp;&nbsp;{label}
    </p>
  );
  

  return (
    <aside className={`${font.className} text-black`} style={{ width: "250px",backgroundImage: `linear-gradient(to bottom, white 80%,  ${primaryColor} 200%)`,
  }}>
      <nav className="flex-1 px-4 mt-6 space-y-4">
        {renderLink("/dashboard", FaHome, "Home")}

        {/* Administration */}
        <div>
          {renderHeading(
            <FaUsers size={"24px"} />,
            "Administration",
            () => setIsApprovalOpen(toggleTabState("isApprovalOpen", isApprovalOpen)),
            isApprovalOpen,
            "administration",
            ["/administration/approval-stages", "/administration/approval-template"]
          )}
          {isApprovalOpen && (
            <div className="mr-4 w-full font-light text-sm">
              {renderLink("/administration/approval-stages", null, "Approval Stages", true, "administration")}
              {renderLink("/administration/approval-template", null, "Approval Template", true, "administration")}
              {renderLink("/administration/authorization-group", null, "Authorization Group", true, "administration")}
              {renderLink("/administration/company", null, "Company Creation", true, "administration")}
              {renderLink("/administration/users", null, "Users Roles", true, "administration")}
              {renderLink("/administration/roles", null, "Roles", true, "administration")}
              {renderLink("/administration/authorization", null, "Authorization", true, "administration")}
            </div>
          )}
        </div>

        {/* Sales */}
        <div>
          {renderHeading(
            <LuPackage size={"24px"} />,
            "Sales",
            () => setIsSaleOpen(toggleTabState("isSaleOpen", isSaleOpen)),
            isSaleOpen,
            "sales",
            ["/Sales/opportunity", "/Sales/sales-quotation"]
          )}
          {isSaleOpen && (
            <div className="mr-4 w-full font-light text-sm">
              {renderLink("/Sales/opportunity", null, "Opportunity", true, "sales")}
              {renderLink("/Sales/sales-quotation", null, "Sales Quotation", true, "sales")}
              {renderLink("/Sales/sales-order", null, "Sales Order", true, "sales")}
              {renderLink("/Sales/delivery", null, "Delivery", true, "sales")}
              {renderLink("/Sales/return", null, "Return", true, "sales")}
              {renderLink("/Sales/return-request", null, "Return Request", true, "sales")}
              {renderLink("/Sales/ar-invoice", null, "A/R Invoice", true, "sales")}
              {renderLink("/Sales/ar-credit-memo", null, "A/R Credit Memo", true, "sales")}
            </div>
          )}
        </div>

        {/* Purchase */}
        <div>
          {renderHeading(
            <GiShoppingCart size={"24px"} />,
            "Purchase",
            () => setIsPurchaseOpen(toggleTabState("isPurchaseOpen", isPurchaseOpen)),
            isPurchaseOpen,
            "purchase",
            ["/Purchase/purchase-request", "/Purchase/purchase-order"]
          )}
          {isPurchaseOpen && (
            <div className="mr-4 w-full font-light text-sm">
              {renderLink("/Purchase/purchase-request", null, "Purchase Request", true, "purchase")}
              {renderLink("/Purchase/purchase-order", null, "Purchase Order", true, "purchase")}
              {renderLink("/Purchase/goods-receipts-po", null, "Goods Receipt PO", true, "purchase")}
              {renderLink("/Purchase/purchase-quotation", null, "Purchase Quotation", true, "purchase")}
              {renderLink("/Purchase/goods-return", null, "Goods Return", true, "purchase")}
              {renderLink("/Purchase/ap-invoice", null, "AP Invioce", true, "purchase")}
              {renderLink("/Purchase/ap-credit-memo", null, "AP Credit Memo", true, "purchase")}
              {renderLink("/Purchase/goods-return-request", null, " Goods Return Request", true, "purchase")}
            </div>
          )}
        </div>

        {/* Inventory */}
        <div>
          {renderHeading(
            <MdOutlineInventory2 size={"24px"} />,
            "Inventory",
            () => setIsInventoryOpen(toggleTabState("isInventoryOpen", isInventoryOpen)),
            isInventoryOpen,
            "inventory",
            ["/Inventory/items", "/Inventory/warehouse"]
          )}
          {isInventoryOpen && (
            <div className="mr-4 w-full font-light text-sm">
            {renderLink("/inventory/inventory-req", null, "Inventory Transfer Req.", true, "inventory")}
              {renderLink("/inventory/inventory-transfer", null, "Inventory Transfer", true, "inventory")}
              {renderLink("/inventory/goods-receipt", null, "Goods Receipt", true, "inventory")}
              {renderLink("/inventory/goods-issue", null, "Goods Issue", true, "inventory")}
            </div>
          )}
        </div>

        {/* Banking */}
        <div>
          {renderHeading(
            <BsBank2 size={"24px"} />,
            "Banking",
            () => setIsBankingOpen(toggleTabState("isBankingOpen", isBankingOpen)),
            isBankingOpen,
            "banking",
            ["/Banking/incoming-payments", "/Banking/outgoing-payments"]
          )}
          {isBankingOpen && (
            <div className="mr-4 w-full font-light text-sm">
              {renderLink("/Banking/incoming-payment", null, "Incoming Payment", true, "banking")}
              {renderLink("/Banking/outgoing-payment", null, "Outgoing Payment", true, "banking")}
            </div>
          )}
        </div>

        {/* Service */}
        <div>
          {renderHeading(
            <RiCustomerServiceFill size={"24px"} />,
            "Service",
            () => setIsServiceOpen(toggleTabState("isServiceOpen", isServiceOpen)),
            isServiceOpen,
            "service",
            ["/Service/contracts", "/Service/calls"]
          )}
          {isServiceOpen && (
            <div className="mr-4 w-full font-light text-sm">
              {renderLink("/Service/service-call", null, "Service Call", true, "service")}
              {renderLink("/Service/equipment-card", null, "Equipment Card", true, "service")}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
