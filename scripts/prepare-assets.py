"""Download public-domain geographic data and an open-access museum image.
Run only deliberately; bundled output means the app makes no third-party tile requests.
"""
import json
import pathlib
import urllib.request
import hashlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
BASE = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/"

def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "SuDo/0.1 educational local prototype"})
    with urllib.request.urlopen(req, timeout=90) as response:
        return response.read()

countries_url = BASE + "ne_50m_admin_0_countries.geojson"
countries = json.loads(get(countries_url))
names = {"Vietnam", "Laos", "Thailand", "Cambodia", "China", "Myanmar", "Malaysia", "India", "Bangladesh", "Bhutan", "Nepal", "Taiwan"}
selected = [{"type": "Feature", "properties": {"name": f["properties"].get("NAME_EN", f["properties"].get("NAME"))}, "geometry": f["geometry"]} for f in countries["features"] if f["properties"].get("NAME_EN", f["properties"].get("NAME")) in names]
if not any(f["properties"]["name"] == "Vietnam" for f in selected):
    raise RuntimeError("Vietnam feature missing; upstream schema changed")
(ROOT / "public/maps/land.json").write_text(json.dumps({"type": "FeatureCollection", "features": selected}, separators=(",", ":")), encoding="utf-8")

rivers_url = BASE + "ne_50m_rivers_lake_centerlines.geojson"
rivers = json.loads(get(rivers_url))
def in_region(coords):
    if not coords:
        return False
    if isinstance(coords[0], (int, float)):
        return 99 <= coords[0] <= 113 and 13 <= coords[1] <= 26
    return any(in_region(c) for c in coords)
selected_rivers = [{"type": "Feature", "properties": {}, "geometry": f["geometry"]} for f in rivers["features"] if in_region(f["geometry"]["coordinates"])]
(ROOT / "public/maps/rivers.json").write_text(json.dumps({"type": "FeatureCollection", "features": selected_rivers}, separators=(",", ":")), encoding="utf-8")

photo_url = "https://images.metmuseum.org/CRDImages/as/original/DP-26130-001.jpg"
photo = get(photo_url)
(ROOT / "public/media/bowl-met.jpg").write_bytes(photo)
manifest = {"generator": "scripts/prepare-assets.py", "method": "Select Natural Earth country features for regional physical base; never historical territory. Rivers selected by regional vertex intersection. No invented or interpolated geometry.", "inputs": [countries_url, rivers_url, photo_url], "photoSha256": hashlib.sha256(photo).hexdigest(), "countryFeatures": len(selected), "riverFeatures": len(selected_rivers)}
(ROOT / "public/maps/provenance.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Prepared {len(selected)} country features, {len(selected_rivers)} rivers and Met image ({len(photo)} bytes)")
