import pyodbc

# Database Connection Details
server = 'localhost'  # Example: 'localhost' or 'your_pc\SQLEXPRESS'
database = 'expense_tracker'
username = 'anjala'  # Use 'anjala' since it is mapped to dbo
password = 'Anjala@4500'  # Replace with the actual password

# ODBC Connection String
conn_str = f"DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password}"

try:
    # Establish Connection
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()
    print("✅ Database Connection Successful!")

    # Test Query to Fetch Data
    cursor.execute("SELECT TOP 5 * FROM your_table_name")  # Replace with your table name
    rows = cursor.fetchall()
    
    print("\n📌 Sample Data:")
    for row in rows:
        print(row)

    # Close Connection
    cursor.close()
    conn.close()
    print("✅ Connection Closed Successfully.")

except Exception as e:
    print(f"❌ Connection Failed: {e}")
