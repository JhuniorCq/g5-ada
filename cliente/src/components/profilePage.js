import Header from "./headerComponent";
import styles from "../css/profile.module.css"
import defaultIMG from '../img/profile.jpg'

export default function ProfilePage() {
    return (
        <main>
            <Header/>
            <div className={styles.profileContainer}>
                <div className={styles.profileColumns}>
                    <div className={styles.profileHeader}>
                        <img alt='profileIMG' src={defaultIMG}></img>
                        <div>
                            <h2>USERNAME</h2>
                            <p>Description</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}