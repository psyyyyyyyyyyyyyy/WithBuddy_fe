import styles from "./groupMatching.module.css";
import { FaUser } from "react-icons/fa";

const members = [
  { id: 1, year: "20학번", name: "윤희준" },
  { id: 2, year: "20학번", name: "변예섭" },
  { id: 3, year: "22학번", name: "이진동" },
  { id: 4, year: "22학번", name: "박성연" },
  { id: 5, year: "23학번", name: "김태현" },
  { id: 6, year: "23학번", name: "박태경" },
];

export default function PersonalMatching() {
  return (
    <div className={styles.container}>
      {members.map((member) => (
        <div key={member.id} className={styles.memberCard}>
          <div className={styles.iconCircle}>
            <FaUser className={styles.icon} />
          </div>
          <p className={styles.year}>{member.year}</p>
          <p className={styles.name}>{member.name}</p>
        </div>
      ))}
    </div>
  );
}
