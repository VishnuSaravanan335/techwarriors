import sqlite3
import json
import os

conn = sqlite3.connect('database/livestock_health.db')
conn.row_factory = sqlite3.Row
cur = conn.cursor()

cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
tables = [r[0] for r in cur.fetchall()]

data = {}
for t in tables:
    cur.execute(f"SELECT * FROM {t}")
    data[t] = [dict(r) for r in cur.fetchall()]

os.makedirs('static/data', exist_ok=True)
with open('static/data/initial_store.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Exported tables:")
for k, v in data.items():
    print(f"  {k}: {len(v)} rows")
