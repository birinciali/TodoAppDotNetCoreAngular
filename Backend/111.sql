SELECT StoreDescription,ProductCode,Location
FROM Store_Table as s INNER JOIN Inventory_Position_Table as i
ON s.StoreCode = i.StoreCode where i.Date=(select max(Date) as maxDate from Inventory_Position_Table )

