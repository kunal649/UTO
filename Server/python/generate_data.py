from faker import Faker
import random
import json

fake = Faker()

def generate_patient_data(num_patients):
    patients = []
    for _ in range(num_patients):
        patient = {
            "id": fake.uuid4(),
            "name": fake.name(),
            "age": random.randint(18, 45),
            "condition": random.choice(["PCOD", "STI", "Fertility Issues"]),
            "last_cycle_length": random.randint(25, 40) if random.choice([True, False]) else None,
            "LH_level": random.randint(5, 20),
            "FSH_level": random.randint(3, 10),
            "medications": random.choice([
                ["Metformin", "Diane-35"], 
                ["Azithromycin"], 
                ["Clomiphene"]
            ]),
            "latest_lab_report": f"LH: {random.randint(5, 20)} mIU/mL, FSH: {random.randint(3, 10)} mIU/mL",
            "symptoms": random.choice([
                "Acne, Irregular Periods", 
                "Painful Urination", 
                "Infertility"
            ]),
        }
        patients.append(patient)
    
    return patients

if __name__ == "__main__":
    print(json.dumps(generate_patient_data(10)))
