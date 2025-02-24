from erpnext.stock.doctype.material_request.material_request import MaterialRequest
import frappe
import sched
import time


class CustomMaterialRequest(MaterialRequest):
    pass
     
    




@frappe.whitelist()
def check_backorder_quantity(doc, items):
    pass


        

def total_purchase_order_qty(item):
        
        specific_item_code = item.item_code  
        total_qty = 0

        purchase_orders = frappe.get_all("Purchase Order", fields=["name"],filters={"docstatus": 1})

        for po in purchase_orders:

            purchase_order = frappe.get_doc("Purchase Order", po.name)
            
            items = purchase_order.get("items")
            
            
            for item_all in items:
                
                if item_all.item_code == specific_item_code:
                    
                    total_qty += item_all.qty
        return total_qty




def total_shipment_order_qty(item):
        
        specific_item_code = item.item_code  
        total_qty = 0

        purchase_orders = frappe.get_all("Shipment Order", fields=["name"], filters={"docstatus": 1})

       
        for po in purchase_orders:

            purchase_order = frappe.get_doc("Shipment Order", po.name)
            
            items = purchase_order.get("items")
            
            
            for item_all in items:
                if item_all.item_code == specific_item_code:
                    
                    total_qty += item_all.qty
        return total_qty




