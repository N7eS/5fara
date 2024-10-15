let users = []; // مصفوفة لتخزين المستخدمين
let currentUser = null; // المستخدم الحالي

function showRegisterForm() {
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("shiftContainer").style.display = "none";
}

function showLoginForm() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("shiftContainer").style.display = "none";
}

function goBack() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("formContainer").style.display = "block";
}

function registerUser() {
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;

    // التحقق إذا كان المستخدم موجود بالفعل
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert("اسم المستخدم موجود بالفعل!");
        return;
    }

    // إضافة مستخدم جديد
    users.push({ username, password, shifts: [] });
    alert("تم تسجيل المستخدم بنجاح!");
    goBack();
}

function loginUser() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    // التحقق من بيانات تسجيل الدخول
    currentUser = users.find(user => user.username === username && user.password === password);
    if (currentUser) {
        alert("مرحبًا بك!");
        document.getElementById("formContainer").style.display = "none";
        document.getElementById("shiftContainer").style.display = "block";
        displayShifts(currentUser.shifts);
    } else {
        alert("اسم المستخدم أو كلمة المرور غير صحيحة!");
    }
}

function logout() {
    currentUser = null;
    document.getElementById("shiftContainer").style.display = "none";
    document.getElementById("formContainer").style.display = "block";
}

function addShift() {
    const shiftDate = document.getElementById("shiftDate").value;
    if (shiftDate) {
        currentUser.shifts.push(shiftDate);
        displayShifts(currentUser.shifts);
        document.getElementById("shiftDate").value = ""; // مسح حقل التاريخ
    }
}

function displayShifts(shifts) {
    const shiftList = document.getElementById("shiftList");
    shiftList.innerHTML = ""; // امسح القائمة الحالية

    shifts.forEach((shift, index) => {
        const li = document.createElement("li");
        li.textContent = `تاريخ الخفارة: ${shift}`;
        
        // إضافة زر لحذف الخفارة
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "حذف";
        deleteButton.style.marginLeft = "10px"; // إضافة هامش بين النص وزر الحذف
        deleteButton.onclick = function() {
            currentUser.shifts.splice(index, 1); // حذف الخفارة من القائمة
            displayShifts(currentUser.shifts); // إعادة عرض القائمة
        };
        
        li.appendChild(deleteButton);
        shiftList.appendChild(li);
    });
}
