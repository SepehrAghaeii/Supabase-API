require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { registerUser, loginUser, getUserProfile } = require('./auth');

const app = express();
app.use(cors());
app.use(express.json());

// اتصال به Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
        console.error('❌ مشکل در اتصال به Supabase:', error.message);
    } else {
        console.log('✅ اتصال به Supabase موفق بود، تعداد کاربران:', data.length);
    }
})();


// دریافت تمام کاربران
app.get('/customers', async (req, res) => {
    const { data, error } = await supabase.from('customers').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// اضافه کردن کاربر جدید
app.post('/customers', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        // Insert data into Supabase
        const { data, error } = await supabase
            .from('customers')
            .insert([{ email }])
            .select('*');

        if (error) {
            console.error('❌ Insert Error:', JSON.stringify(error, null, 2));  // Print full error details
            return res.status(500).json({ error: error.message, details: error });
        }

        res.status(201).json({ message: 'User created successfully', user: data[0] });

    } catch (err) {
        console.error('❌ Server Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});




// ویرایش اطلاعات کاربر
app.put('/customers/:id', async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    const { data, error } = await supabase.from('customers').update({ email }).eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// حذف کاربر
app.delete('/customers/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('customers').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.send('✅ کاربر با موفقیت حذف شد');
});


app.post('/register', registerUser);
app.post('/login', loginUser);
app.get('/profile', getUserProfile);


// تست اتصال
app.get('/', (req, res) => {
    res.send('✅ API is running...');
});


// راه‌اندازی سرور
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

console.log('🔹 Supabase URL:', process.env.SUPABASE_URL);
console.log('🔹 Supabase Key:', process.env.SUPABASE_KEY ? '✅ موجود است' : '❌ کلید تعریف نشده');
