from erpnext.buying.doctype.purchase_order.purchase_order import PurchaseOrder
import frappe
from frappe.utils import nowdate

class CustomPurchaseOrder(PurchaseOrder):
    pass

@frappe.whitelist()
def create_shipment_order(docname):
   
    purchase_order = frappe.get_doc("Purchase Order", docname)

    
    shipment_order = frappe.new_doc("Shipments Orders")

 
    shipment_order.purchase_order_name = purchase_order.name
    shipment_order.supplier = purchase_order.supplier
    shipment_order.conversion_rate = purchase_order.conversion_rate
    shipment_order.base_net_total = purchase_order.base_net_total
    shipment_order.set_warehouse = purchase_order.set_warehouse
    shipment_order.currency = purchase_order.currency
    shipment_order.conversion_rate = purchase_order.conversion_rate
    shipment_order.buying_price_list = purchase_order.buying_price_list
    shipment_order.price_list_currency = purchase_order.price_list_currency
    shipment_order.plc_conversion_rate = purchase_order.plc_conversion_rate
    shipment_order.total_qty = purchase_order.total_qty
    shipment_order.base_total = purchase_order.base_total
    shipment_order.total = purchase_order.total
    shipment_order.base_grand_total = purchase_order.base_grand_total
    shipment_order.base_rounding_adjustment = purchase_order.base_rounding_adjustment
    shipment_order.base_rounded_total = purchase_order.base_rounded_total
    shipment_order.grand_total = purchase_order.grand_total
    shipment_order.rounding_adjustment = purchase_order.rounding_adjustment
    shipment_order.rounded_total = purchase_order.rounded_total

    for item in purchase_order.items:

        total = total_purchase_order_qty(item, purchase_order.name) - total_shipment_order_qty(item, purchase_order.name)
        

        shipment_order.append("items", {
            "item_code": item.item_code,
            "item_name": item.item_name,
            "uom": item.uom,
            "received_qty": item.received_qty,
            "qty": total,
            "total_quantity_from_purchase_order": total,
            "custom_quantity_sold_in_the_last_6_month": 0,
            "price_list_rate": item.price_list_rate,
            "last_purchase_rate": item.last_purchase_rate,
            "base_price_list_rate": item.base_price_list_rate,
            "discount_percentage": item.discount_percentage,
            "discount_amount": item.discount_amount,
            "rate": item.rate,
            "amount": item.amount,
            "base_rate": item.base_rate,
            "base_amount": item.base_amount,
            "net_rate": item.net_rate,
            "net_amount": item.net_amount,
            "base_net_rate": item.base_net_rate,
            "base_net_amount": item.base_net_amount,
            "warehouse": item.warehouse,
            "expense_account": item.expense_account,
            "conversion_factor": 1,
            "purchase_order": purchase_order.name,
        })

    
    shipment_order.insert(ignore_permissions=True)
    

    return shipment_order.name




def total_purchase_order_qty(item, docname):
        
        specific_item_code = item.item_code  
        total_qty = 0

        purchase_orders = frappe.get_all("Purchase Order", fields=["name"],filters={"docstatus": 1,"name": docname})

        for po in purchase_orders:

            purchase_order = frappe.get_doc("Purchase Order", po.name)
            
            items = purchase_order.get("items")
            
            
            for item_all in items:
                
                if item_all.item_code == specific_item_code:
                    
                    total_qty += item_all.qty
        return total_qty




def total_shipment_order_qty(item, docname):
        
        specific_item_code = item.item_code  
        total_qty = 0

        purchase_orders = frappe.get_all("Shipments Orders", fields=["name"], filters={"docstatus": 1,"purchase_order_name": docname})

       
        for po in purchase_orders:

            purchase_order = frappe.get_doc("Shipments Orders", po.name)
            
            items = purchase_order.get("items")
            
            
            for item_all in items:
                
                if item_all.item_code == specific_item_code:
                    
                    total_qty += item_all.qty
        return total_qty

