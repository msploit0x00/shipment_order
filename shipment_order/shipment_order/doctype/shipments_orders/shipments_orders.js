frappe.ui.form.on('Shipments Orders', {
    refresh: function(frm) {
        if (frm.doc.docstatus === 1) {  

        

            frm.add_custom_button(__('Purchase Receipt'), function() {
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
            
                            // Create a new Purchase Receipt document
                            let purchase_receipt = frappe.model.get_new_doc('Purchase Receipt');
            
                            // Set fields for the Purchase Receipt
                            purchase_receipt.naming_series = "PUR-.YYYY.-";
                            purchase_receipt.supplier = shipments_orders.supplier;
                            purchase_receipt.posting_date = shipments_orders.posting_date;
                            purchase_receipt.posting_time = shipments_orders.posting_time;
                            purchase_receipt.company = shipments_orders.company;
                            purchase_receipt.custom_purchase_order_name = shipments_orders.purchase_order_name;
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
            
                            // Add items to the Purchase Receipt
                            shipments_orders.items.forEach(item => {
                                let child = frappe.model.add_child(purchase_receipt, 'Purchase Receipt Item', 'items');
                                child.item_code = item.item_code;
                                child.item_name = item.item_name;
                                child.description = item.description;
                                child.uom = item.uom;
                                child.qty = item.qty;
                                child.rate = item.rate;
                                child.amount = item.amount;
                                child.net_rate = item.net_rate;
                                child.net_amount = item.net_amount;
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
                                child.margin_rate_or_amount = item.margin_rate_or_amount;
                                child.rate_with_margin = item.rate_with_margin;
                                child.base_rate_with_margin = item.base_rate_with_margin;
                                child.base_rate = item.base_rate;
                                child.base_amount = item.base_amount;
                                child.base_net_rate = item.base_net_rate;
                                child.base_net_amount = item.base_net_amount;
                                child.landed_cost_voucher_amount = item.landed_cost_voucher_amount;
                                child.rate_difference_with_purchase_invoice = item.rate_difference_with_purchase_invoice;
                                child.billed_amt = item.billed_amt;
                                child.rejected_warehouse = item.rejected_warehouse;
                                child.expense_account = item.expense_account;
                                child.item_group = item.item_group;
                                child.stock_uom = item.stock_uom;
                                child.stock_qty = item.stock_qty;
                                child.stock_uom_rate = item.stock_uom_rate;
                                child.pricing_rules = item.pricing_rules;
                                child.is_free_item = item.is_free_item;
                                child.apply_tds = item.apply_tds;
                                child.item_tax_template = item.item_tax_template;
                                child.valuation_rate = item.valuation_rate;
                                child.schedule_date = item.schedule_date;
                                child.cost_center = item.cost_center;
                                child.conversion_factor = item.conversion_factor;

                                // console.log('child.margin_type', item.margin_type);
                                // console.log('child.margin_rate_or_amount', item.margin_rate_or_amount);
                                // console.log('child.rate_with_margin ', item.rate_with_margin );
                                // console.log('child.base_rate_with_margin', item.base_rate_with_margin);
                            });
            
                            // Open the Purchase Receipt in a new form without saving
                            frappe.set_route('Form', 'Purchase Receipt', purchase_receipt.name);
                        }
                    }
                });
            }, __('Create'));





            frm.add_custom_button(__('Purchase Invoice'), function() {
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
            
                            // Create a new Purchase Invoice document
                            let purchase_invoice = frappe.model.get_new_doc('Purchase Invoice');
            
                            // Set fields for the Purchase Invoice
                            purchase_invoice.supplier = shipments_orders.supplier;
                            purchase_invoice.company = shipments_orders.company;
                            purchase_invoice.naming_series = 'ACC-PINV-.YYYY.-';
                            purchase_invoice.posting_date = shipments_orders.posting_date;
                            purchase_invoice.credit_to = '21030010001-21030019999 - مورد محلي ضريبي - D';
                            purchase_invoice.payment_terms_template = 'كاش';
                            purchase_invoice.supplier_group = 'مورد خارجي';
            
                            // Add items to the Purchase Invoice
                            shipments_orders.items.forEach(item => {
                                let child = frappe.model.add_child(purchase_invoice, 'Purchase Invoice Item', 'items');
                                child.item_name = item.item_name;
                                child.item_code = item.item_code;
                                child.qty = item.qty;
                                child.uom = item.uom;
                                child.conversion_factor = item.conversion_factor;
                                child.stock_qty = item.stock_qty;
                                child.rate = item.rate;
                                child.amount = item.amount;
                                child.base_net_rate = item.base_net_rate;
                                child.base_net_amount = item.base_net_amount;
                                child.base_rate = item.base_rate;
                                child.base_amount = item.base_amount;
                                child.expense_account = item.expense_account;
                                child.purchase_order = item.purchase_order;
                                child.price_list_rate = item.price_list_rate;
                                child.base_price_list_rate = item.base_price_list_rate;
                                child.discount_percentage = item.discount_percentage;
                                child.discount_amount = item.discount_amount;
                                child.margin_type = item.margin_type;
                                child.margin_rate_or_amount = item.margin_rate_or_amount;
                                child.rate_with_margin = item.rate_with_margin;
                                child.base_rate_with_margin = item.base_rate_with_margin;
                                child.item_tax_template = item.item_tax_template;
                                child.stock_uom_rate = item.stock_uom_rate;
                                child.apply_tds = item.apply_tds;
                                child.landed_cost_voucher_amount = item.landed_cost_voucher_amount;
                            });
            
                            // Open the Purchase Invoice in a new form without saving
                            frappe.set_route('Form', 'Purchase Invoice', purchase_invoice.name);
                        }
                    }
                });
            }, __('Create'));

            

        }
    }
});
          