// frappe.ui.form.on('Material Request', {
//     scan_barcode: function(frm) {
        
//         frappe.call({
//             method: "shipment_order.material_request_edit.check_backorder_quantity",  
//             args: {
//                 doc: frm.doc,
//                 items : frm.doc.items   
//             },

//             callback: function(response) {
//             }
//         });
           

//     }
// });


// frappe.ui.form.on('Material Request', {
//     scan_barcode: function (frm) {
//         // Add a delay of 2 seconds
//         setTimeout(function () {
//             frm.doc.items.forEach(function (row) {
//                 // Calculate backorder quantity
//                 let backorder_qty = row.custom_purchase_quantity - row.custom_received_quantity;
//                 frappe.model.set_value(row.doctype, row.name, 'custom_backorder_quantity', backorder_qty);
//                 console.log("Backorder calculated!");
//             });
//             frm.refresh_field('items');
//         }, 2000); // Delay in milliseconds
//     },
// });







frappe.ui.form.on('Material Request', {

    scan_barcode: function(frm) {
        
        setTimeout(() => {
            total_shipment_qty = 0;
            backorder_qty = 0;

            frm.doc.items.forEach(function (row) {
                let item_code_to_search = row.item_code; 
                // Fetch all Purchase Orders containing the specified item_code
                frappe.call({   
                    method: 'frappe.client.get_list',
                    args: {
                        doctype: 'Shipment Order',
                        fields: ['name'],
                        filters: [
                            ['Shipment Items', 'item_code', '=', item_code_to_search],
                            ['docstatus', '=', 1]
                        ],
                        
                        
                    },
                    callback: function(response) {
                        if (response.message && response.message.length > 0) {
                            // Loop through each Purchase Order
                            response.message.forEach(function(po) {
                                frappe.call({
                                    method: 'frappe.client.get',
                                    args: {
                                        doctype: 'Shipment Order',
                                        name: po.name
                                    },
                                    callback: function(po_response) {
                                        if (po_response.message) {
                                            let purchase_order = po_response.message;
                                            // Find the item with the matching item_code
                                            purchase_order.items.forEach(function(item) {
                                                if (item.item_code === item_code_to_search) {
                                                   
                                                    console.log('Shipment Order:', po.name, 'Item Code:', item.item_code, 'Qty:', item.qty);
                                                    total_shipment_qty = total_shipment_qty + item.qty
                                                    
                                                }
                                            });
                                            
                                        }
                                    }
                                   
                                });
                                backorder_qty =  row.custom_purchase_quantity  - total_shipment_qty
                                frappe.model.set_value(row.doctype, row.name, 'custom_backorder_quantity', backorder_qty);
                                console.log('Total value is : ' + backorder_qty);
                            });
                        } else {
                            frappe.msgprint('No Purchase Order found with the specified item code.');
                        }
                    }
                });
    
            });

        }, 1000);



       
        
        

        
    }
});