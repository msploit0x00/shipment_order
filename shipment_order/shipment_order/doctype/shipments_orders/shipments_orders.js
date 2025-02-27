frappe.ui.form.on('Shipments Orders', {
    refresh: function(frm) {
        if (frm.doc.docstatus === 1) {  

            frm.add_custom_button(__('Create Purchase Receipt'), function() {
                frappe.call({
                    method: 'frappe.client.get',
                    args: {
                        doctype: 'Shipments Orders',
                        name: frm.doc.name
                    },
                    callback: function(r) {
                        if (r.message) {
                            let shipments_orders = r.message;

                            // Ensure items exist
                            if (!shipments_orders.items || shipments_orders.items.length === 0) {
                                frappe.msgprint(__('No items found in Shipments Orders.'));
                                return;
                            }

                            let purchase_receipt = frappe.model.get_new_doc('Purchase Receipt');


                            purchase_receipt.naming_series = shipments_orders.naming_series;
                            purchase_receipt.supplier = shipments_orders.supplier;
                            purchase_receipt.posting_date = shipments_orders.posting_date;
                            purchase_receipt.company = shipments_orders.company;
                            purchase_receipt.custom_purchase_order_name = shipments_orders.purchase_order_name;
                            purchase_receipt.posting_time = shipments_orders.posting_time;
                            purchase_receipt.currency = shipments_orders.currency;
                            purchase_receipt.conversion_rate = shipments_orders.conversion_rate;
                            purchase_receipt.buying_price_list = shipments_orders.buying_price_list;
                            purchase_receipt.price_list_currency = shipments_orders.price_list_currency;
                            purchase_receipt.plc_conversion_rate = shipments_orders.plc_conversion_rate;
                            purchase_receipt.set_warehouse = shipments_orders.set_warehouse;
                            purchase_receipt.total_qty = shipments_orders.total_qty;
                            purchase_receipt.base_total = shipments_orders.base_total;
                            purchase_receipt.base_tax_withholding_net_total = shipments_orders.base_tax_withholding_net_total;
                            purchase_receipt.base_grand_total = shipments_orders.base_grand_total;
                            purchase_receipt.base_rounded_total = shipments_orders.base_rounded_total;
                            purchase_receipt.grand_total = shipments_orders.grand_total;
                            purchase_receipt.rounded_total = shipments_orders.rounded_total;
                            purchase_receipt.apply_discount_on = shipments_orders.apply_discount_on;
                            purchase_receipt.base_discount_amount = shipments_orders.base_discount_amount;
                        
                            

                            shipments_orders.items.forEach(item => {
                                let child = frappe.model.add_child(purchase_receipt, 'Purchase Receipt Item', 'items');
                                child.item_code = item.item_code;
                                child.item_name = item.item_name;
                                child.uom = item.uom;
                                child.qty = item.qty;
                                child.rate = item.rate;
                                child.amount = item.amount;
                                child.warehouse = item.warehouse;
                                child.purchase_order = shipments_orders.purchase_order;
                                child.received_qty = item.received_qty;
                                child.rejected_qty = item.rejected_qty;
                                child.custom_quantity_sold_in_the_last_6_month = item.custom_quantity_sold_in_the_last_6_month;
                                child.price_list_rate = item.price_list_rate;
                                child.base_price_list_rate = item.base_price_list_rate;
                                child.discount_percentage = item.discount_percentage;
                                child.discount_amount = item.discount_amount;
                                child.margin_type = item.margin_type;
                                child.base_rate = item.base_rate;
                                child.base_amount = item.base_amount;
                                child.base_net_rate = item.base_net_rate;
                                child.base_net_amount = item.base_net_amount;
                                child.landed_cost_voucher_amount = item.landed_cost_voucher_amount;
                                child.rate_difference_with_purchase_invoice = item.rate_difference_with_purchase_invoice;
                                child.billed_amt = item.billed_amt;
                                child.net_rate = item.net_rate;
                                child.net_amount = item.net_amount;
                                child.rejected_warehouse = item.rejected_warehouse;
                                child.expense_account = item.expense_account;
                            });

                            frappe.call({
                                method: 'frappe.client.insert',
                                args: {
                                    doc: purchase_receipt
                                },
                                callback: function(response) {
                                    if (response.message) {
                                        frappe.set_route('Form', 'Purchase Receipt', response.message.name);
                                    }
                                }
                            });
                        }
                    }
                });
            }, __('Create'));



             // Second Custom Button (Example: Create Draft Purchase Receipt)
             frm.add_custom_button(__('Create Purchase Invoice'), function() {
                frappe.call({
                    method: 'frappe.client.get',
                    args: {
                        doctype: 'Shipments Orders',
                        name: frm.doc.name
                    },
                    callback: function(r) {
                        if (r.message) {
                            let shipments_orders = r.message;

                            // Ensure items exist
                            if (!shipments_orders.items || shipments_orders.items.length === 0) {
                                frappe.msgprint(__('No items found in Shipments Orders.'));
                                return;
                            }

                            let purchase_invoice = frappe.model.get_new_doc('Purchase Invoice');


                            purchase_invoice.supplier = 'USD';
                            purchase_invoice.naming_series = 'ACC-PINV-.YYYY.-';    
                            purchase_invoice.posting_date = shipments_orders.posting_date;
                            purchase_invoice.credit_to = '21030010001-21030019999 - مورد محلي ضريبي - D';
                            

                            shipments_orders.items.forEach(item => {
                                let child = frappe.model.add_child(purchase_invoice, 'Purchase Invoice Item', 'items');
                               
                                child.item_name = item.item_name;
                                child.qty = item.qty;
                                child.uom = item.uom;
                                child.conversion_factor = item.conversion_factor;
                                child.stock_qty = item.stock_qty;
                                child.rate = item.rate;
                                child.amount = item.amount;
                                child.base_rate = item.base_rate;
                                child.base_amount = item.base_amount;
                                child.expense_account = item.expense_account;
                                
                            });

                            frappe.call({
                                method: 'frappe.client.insert',
                                args: {
                                    doc: purchase_invoice
                                },
                                callback: function(response) {
                                    if (response.message) {
                                        frappe.set_route('Form', 'Purchase Invoice', response.message.name);
                                    }
                                }
                            });
                        }
                    }
                });
            }, __('Create'));

        }
    }
});















