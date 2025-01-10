Περιγραφή Εργασίας 

  Το ataxx παίζεται σε σε 7x7 πίνακα. Επιτρέπονται οι κινήσεις διαγώνια, οριζόντια και κάθετα μέχρι και 2 κελιά μακριά. Εάν κουνηθεί ένα κελί μακριά τότε μένει το πιόνι στην αρχική θέση και εμφανίζεται ένα στον προορισμό και αν κουνθεί 2 τότε φεύγει απο την αρχή και παεί στον προορισμό.
  Αν πάει σε κελί που δίπλα έχει πιόνια του αντιπάλου τα μετατρέπει σε φιλικά. 


  Στην αρχή εμφανίζεται ο πίνακας με 4 πιόνια, 2 λευκά και 2 μαύρα σε απέναντι γωνίες.

  


Η βάση μας κρατάει τους εξής πίνακες και στοιχεία:
  
  α. Ο πίνακας ataxx_board:
      Αποθηκεύει 3 στοιχεία:
         1. row
         2. column
         3. content
      Τα πρώτα δυο αφορούν τις συντεταγμένες τοποθέτησης των πιονιών του κάθε παίκτη.
      Το τρίτο στοιχείο δίνει την πληροφορία για το εάν σε κάθε κελί υπάρχει τοποθετημένο κάποιο πιόνι. Μπορεί να πάρει την τιμή white, black ή NULL.
   
   β. Ο πίνακας paiktes:
      Αποθηκεύει 4 στοιχεία:
         1. idPaikth
         2. etiketaPaikth
         3. usernamePaikth
         4. passwordPaikth
      Το πρώτο αφορά το τυχαίο id που θα έχει ο κάθε παίκτης. Χρησιμοποιείται για την υλοποίηση της λογικής του session.
      Το δεύτερο αφορά στον τρόπο διαχωρισμού των δυο παικτών. Μπορεί να πάρει την τιμή 'white' ή την τιμή 'black'.
      Το τρίτο αφορά το όνομα χρήστη του κάθε παίκτη. Χρησιμεύει για την σύνδεση του κάθε χρήστη στην εφαρμογή.
      Το τέταρτο αφορά τον κωδικό του κάθε χρήστη. Χρησιμεύει για την σύνδεση του κάθε χρήστη στην εφαρμογή.
   
   γ. Ο πίνακας statuspaixnidiou:
      Αποθηκεύει 4 στοιχεία:
         1. game_status
         2. round
         3. winner
         4. validmove
      Το πρώτο αφορά την κατάσταση του παιχνιδιού. Μπορεί να πάρει τις εξής τιμές, 'not active', 'initialized', 'active', 'ended', 'aborted' .
      Το δεύτερο αφορά την καταγραφή των γύρων του παιχνιδιού. 
      Το τρίτο αφορά το ποιος είναι ο νικητής.
      Το τέταρτο αφορά τον έλεγχο διαθεσιμότητας κίνησης.






Η εφαρμογή καλύπτει τις εξής απαιτήσεις:

Υλοποίηση WebAPI.

Αρχικοποίηση σύνδεσης-authentication.

Έλεγχος κανόνων παιχνιδιού.

Αναγνώριση σειράς παιξιάς.

Αναγνώρηση Deadlock.

Χρήση json για τα δεδομένα.

Αποθήκευση της κατάστασης του παιχνιδιού πλήρως σε mysql.







Περιγραφή API


Εγγραφή παικτών

POST /signUp/

Πραγματοποίηση της εγγραφής των παικτών.

Json Data:

playerTag: Το χρώμα του χρήστη

username:	To όνομα χρήστη	yes

password:	Ο κωδικός	yes

passwordRepeat:	Επανάληψη κωδικού για επιβεβαίωση	yes

token:	Το μοναδικό id κάθε παίκτη



Σύνδεση παικτών

POST PHP/logIn/

Πραγματοποιήση της σύνδεσης των παικτών στην εφαρμογή

Json Data:

username:	To όνομα χρήστη

password:	Ο κωδικός	

token:	Το μοναδικό id κάθε παίκτη



Reset των πινάκων

POST PHP/resetBoard

Χρησιμεύει για την αρχικοποίηση των πινάκων και των δυο παικτών. Καλείται όταν οι παίκτες επιλέξουν το κουμπί "Έναρξη παιχνιδιού"



Reset του status του παιχνιδιού

POST PHP/resetStatus

Χρησιμεύει στην επαναφορά της αρχικής κατάστασης του παιχνιδιού


Ενημέρωση του πίνακα όταν πραγματοποιείται κίνηση

POST PHP/updateStatusBoard

Json Data:

rowst: Η γραμμή εκκίνησης
columnst: Η στήλη εκκίνησης  
rowdes: Η γραμμή τερματισμού
columndes: Η στήλη τερματισμού
tag: Το χρώμα του πιονιού που θα κινηθεί




Ενημέρωση ύπαρξης διαθέσιμων κινήσεων

POST PHP/updatevalidmove

Όταν δεν υπάρχουν διαθέσημες κινήσεις για έναν απο τουσ 2 παίκτες παίρνει την μεταβλητή validmove και της δίνει την τιμή 'no'


Αύξηση των γύρων του παιχνιδιού

POST PHP/incround

Αυξάνει τον γύρο κατά 1 όταν τελειώνει ο γύρος












