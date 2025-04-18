# Copyright (c) 2025, purchase_receipt and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ShipmentsOrders(Document):
	    
	def before_submit(doc):
		order = frappe.get_doc("Shipments Orders", doc.name)
		for item in order.items:
			if float(item.qty) > float(item.total_quantity_from_purchase_order):
				frappe.throw(f"Quantity of item in Shipment Order {item.qty} is greater than Purchase Order Quantity Exist on Total Quantity field {item.total_quantity_from_purchase_order}")



