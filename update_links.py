
import json
import os

files = [
    r"d:\Devlopment\alef-website\messages\en.json",
    r"d:\Devlopment\alef-website\messages\ar.json",
    r"d:\Devlopment\alef-website\messages\fr.json",
    r"d:\Devlopment\alef-website\messages\es.json"
]

senate_republicans_links = [
    "https://grassley.senate.gov/contact",
    "https://risch.senate.gov/public/index.cfm/email",
    "https://joewilson.house.gov/contact/email-me",
    "https://lahood.house.gov/contact",
    "https://lankford.senate.gov/contact/email",
    "https://ernst.senate.gov/content/contact-joni",
    "https://lgraham.senate.gov/public/index.cfm/e-mail-senator-graham",
    "https://cotton.senate.gov/contact",
    "https://young.senate.gov/contact/email-todd",
    "https://wicker.senate.gov/public/index.cfm/contact",
    "https://daines.senate.gov/contact",
    "https://rickscott.senate.gov/contact_rick",
    "https://cruz.senate.gov/contact/write-ted"
]

senate_democrats_links = [
    "https://warner.senate.gov/public/index.cfm/contactpage",
    "https://wyden.senate.gov/contact/email-ron",
    "https://kelly.senate.gov/contact/contact-form",
    "https://slotkin.senate.gov/contact"
]

house_republicans_links = [
    "https://mccaul.house.gov/contact",
    "https://lawler.house.gov/contact",
    "https://nunn.house.gov/contact/email-zach",
    "https://mccormick.senate.gov/contact",
    "https://issa.house.gov/contact",
    "https://joewilson.house.gov/contact/email-me",
    "https://bacon.house.gov/contact",
    "https://messmer.house.gov/contact",
    "https://mast.house.gov/email",
    "https://mikerogers.house.gov/contact",
    "https://shreve.house.gov/contact",
    "https://tenney.house.gov/contact",
    "https://steube.house.gov/contact/"
]

house_democrats_links = [
    "https://gottheimer.house.gov/contact",
    "https://schneider.house.gov/contact",
    "https://ritchietorres.house.gov/contact",
    "https://dondavis.house.gov/contact",
    "https://rosen.senate.gov/email-jacky",
    "https://panetta.house.gov/contact",
    "https://sherman.house.gov/contact",
    "https://meeks.house.gov/contact"
]

def add_https(url):
    if not url.startswith("http"):
        return "https://" + url
    return url

# Normalize links just in case
senate_republicans_links = [add_https(x) for x in senate_republicans_links]
senate_democrats_links = [add_https(x) for x in senate_democrats_links]
house_republicans_links = [add_https(x) for x in house_republicans_links]
house_democrats_links = [add_https(x) for x in house_democrats_links]

for file_path in files:
    try:
        if not os.path.exists(file_path):
            print(f"File not found: {file_path}")
            continue
            
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        members = data.get("CongressionalAdvocacyPage", {}).get("members", {})
        if not members:
            print(f"No members found in {file_path}")
            continue

        # Senate Republicans
        for i, member in enumerate(members.get("senate_republicans", [])):
            if i < len(senate_republicans_links):
                member["contact"] = senate_republicans_links[i]

        # Senate Democrats
        for i, member in enumerate(members.get("senate_democrats", [])):
            if i < len(senate_democrats_links):
                member["contact"] = senate_democrats_links[i]

        # House Republicans
        for i, member in enumerate(members.get("house_republicans", [])):
            if i < len(house_republicans_links):
                member["contact"] = house_republicans_links[i]

        # House Democrats
        for i, member in enumerate(members.get("house_democrats", [])):
            if i < len(house_democrats_links):
                member["contact"] = house_democrats_links[i]

        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"Updated {file_path}")

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
