from erpnext.buying.doctype.purchase_order.purchase_order import PurchaseOrder
import frappe
from frappe.utils import nowdate

class CustomPurchaseOrder(PurchaseOrder):
    pass

@frappe.whitelist()
def create_shipment_order(docname):
    # Fetch the Purchase Order document
    purchase_order = frappe.get_doc("Purchase Order", docname)

    # Create a new Shipment Order
    shipment_order = frappe.new_doc("Shipment Order")

    # Transfer data from Purchase Order to Shipment Order
    shipment_order.purchase_order_name = purchase_order.name

    for item in purchase_order.items:

        total = total_purchase_order_qty(item, purchase_order.name) - total_shipment_order_qty(item, purchase_order.name)
        

        shipment_order.append("items", {
            "item_code": item.item_code,
            "item_name": item.item_name,
            "uom": item.uom,
            "base_rate": item.base_rate,
            "conversion_factor": 1,
            "total_quantity_from_purchase_order": total,
            "qty": 0,
            "net_rate": item.rate,
            "base_net_amount": item.amount
        })

    # Save and submit the Shipment Order (optional)
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

        purchase_orders = frappe.get_all("Shipment Order", fields=["name"], filters={"docstatus": 1,"purchase_order_name": docname})

       
        for po in purchase_orders:

            purchase_order = frappe.get_doc("Shipment Order", po.name)
            
            items = purchase_order.get("items")
            
            
            for item_all in items:
                
                if item_all.item_code == specific_item_code:
                    
                    total_qty += item_all.qty
        return total_qty

