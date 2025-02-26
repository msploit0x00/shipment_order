frappe.ui.form.on('Material Request', {
    scan_barcode: function(frm) {
        setTimeout(() => {
            frm.doc.items.forEach(function (row) {
                let total_shipment_qty = []; // Clear the list for each row
                let backorder_qty = 0;

                let item_code_to_search = row.item_code; 

                // Fetch all Shipments Orders containing the specified item_code
                frappe.call({   
                    method: 'frappe.client.get_list',
                    args: {
                        doctype: 'Shipments Orders',
                        fields: ['name'],
                        filters: [
                            ['Shipment Items', 'item_code', '=', item_code_to_search],
                            ['docstatus', '=', 1]
                        ],
                    },
                    callback: function(response) {
                        if (response.message && response.message.length > 0) {
                            // Loop through each Shipments Orders
                            response.message.forEach(function(po) {
                                frappe.call({
                                    method: 'frappe.client.get',
                                    args: {
                                        doctype: 'Shipments Orders',
                                        name: po.name
                                    },
                                    callback: function(po_response) {
                                        if (po_response.message) {
                                            let purchase_order = po_response.message;
                                            // Find the item with the matching item_code
                                            purchase_order.items.forEach(function(item) {
                                                if (item.item_code === item_code_to_search) {
                                                    console.log('Shipments Orders:', po.name, 'Item Code:', item.item_code, 'Qty:', item.qty);

                                                    total_shipment_qty.push(item.qty); // Add the quantity to the list
                                                    console.log('Total Shipment Quantity:', total_shipment_qty);

                                                    let sum = total_shipment_qty.reduce((acc, val) => acc + val, 0);
                                                    console.log('Summmmmmmmm:', sum);
                                                    
                                                    backorder_qty = row.custom_purchase_quantity - sum;
                                                    frappe.model.set_value(row.doctype, row.name, 'custom_backorder_quantity', backorder_qty);
                                                    console.log('Total value is : ' + backorder_qty);
                                                }
                                            });
                                        }
                                    }
                                });
                            });
                        } else {
                            frappe.msgprint('No Shipments Orders found with the specified item code.');
                        }
                    }
                });
            });
        }, 1000);
    }

});




frappe.ui.form.on('Material Request Item', {
    item_code: function(frm, cdt, cdn) {
        let row = frappe.get_doc(cdt, cdn); 
        if (!row.item_code) return;

        

        
        frappe.call({
            method: 'frappe.client.get',
            args: {
                doctype: 'Item',
                name: row.item_code
            },
            callback: function(data) {
                if (data.message) {
                    row.item_name = data.message.item_name;
                    frm.refresh_field('items');
                }
            }
        });

        
        setTimeout(() => {
            let total_shipment_qty = []; 
            let backorder_qty = 0;
            let item_code_to_search = row.item_code;

            
            frappe.call({
                method: 'frappe.client.get_list',
                args: {
                    doctype: 'Shipments Orders',
                    fields: ['name'],
                    filters: [
                        ['Shipment Items', 'item_code', '=', item_code_to_search],
                        ['docstatus', '=', 1]
                    ],
                },
                callback: function(response) {
                    if (response.message && response.message.length > 0) {
                     
                        response.message.forEach(function(po) {
                            frappe.call({
                                method: 'frappe.client.get',
                                args: {
                                    doctype: 'Shipments Orders',
                                    name: po.name
                                },
                                callback: function(po_response) {
                                    if (po_response.message) {
                                        let shipment_order = po_response.message;
                               
                                        shipment_order.items.forEach(function(item) {
                                            if (item.item_code === item_code_to_search) {
                                                console.log('Shipments Orders:', po.name, 'Item Code:', item.item_code, 'Qty:', item.qty);

                                                total_shipment_qty.push(item.qty); 
                                                console.log('Total Shipment Quantity:', total_shipment_qty);

                                                let sum = total_shipment_qty.reduce((acc, val) => acc + val, 0);
                                                console.log('Total Shipment Sum:', sum);

                                                backorder_qty = row.custom_purchase_quantity - sum;
                                                frappe.model.set_value(cdt, cdn, 'custom_backorder_quantity', backorder_qty);
                                                console.log('Backorder Quantity:', backorder_qty);
                                            }
                                        });
                                    }
                                }
                            });
                        });
                    } else {
                        frappe.msgprint('No Shipments Orders found with the specified item code.');
                    }
                }
            });
        }, 1000);
    }
});

