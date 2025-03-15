import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Header from '../main/Header';
import Footer from '../main/Footer';
import { IoReload } from 'react-icons/io5';
import { config } from '../../configs/config';
import Security from './Security';

interface Message {
    id: number;
    username: string;
    gender: string;
    message: string;
    timestamp: string;
}

const AdminPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    const fetchMessages = async () => {
        try {
            const response = await axios.get<Message[]>(config.messageAPI);
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages(); 
    }, []);

    const handleMessageClick = (message: Message) => {
        setSelectedMessage(message); 
    };

    const closeModal = () => {
        setSelectedMessage(null); 
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl font-extrabold text-center text-gray-800 mb-10"
                >
                    Support Dashboard
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="overflow-x-auto bg-white rounded-2xl shadow-xl"
                >
                    <table className="min-w-full text-sm text-left text-gray-500">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Username</th>
                                <th className="px-6 py-3">Gender</th>
                                <th className="px-6 py-3">Message</th>
                                <th className="px-6 py-3">Timestamp</th>
                                <th className="px-6 py-3 cursor-pointer">
                                    <IoReload style={{ fontSize: '20px' }} onClick={fetchMessages} />
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {messages.reverse().map((message, index) => (
                                <motion.tr
                                    key={message.id}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="hover:bg-gray-50 cursor-pointer transition-all"
                                    onClick={() => handleMessageClick(message)}
                                >
                                    <td className="px-6 py-4">{message.id}</td>
                                    <td className="px-6 py-4">{message.username}</td>
                                    <td className="px-6 py-4">
                                        {message.gender === "Male" ? (
                                            <span className="w-3 py-1 bg-blue-100 text-blue-800 rounded-full">Male</span>
                                        ) : message.gender === "Female" ? (
                                            <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full">Female</span>
                                        ) : (
                                            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full">Other</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {message.message.length > 25 ? message.message.slice(0, 25) + "..." : message.message}
                                    </td>
                                    <td className="px-6 py-4">{new Date(message.timestamp).toLocaleString()}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </div>

            {/* Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-semibold text-gray-800 mb-4"
                        >
                            Message Details
                        </motion.h2>
                        <p className="text-lg mb-4"><strong>ID:</strong> {selectedMessage.id}</p>
                        <p className="text-lg mb-4"><strong>Username:</strong> {selectedMessage.username}</p>
                        <p className="text-lg mb-4"><strong>Gender:</strong> {selectedMessage.gender}</p>
                        <p className="text-lg mb-4"><strong>Message:</strong> {selectedMessage.message}</p>
                        <p className="text-lg mb-4"><strong>Timestamp:</strong> {new Date(selectedMessage.timestamp).toLocaleString()}</p>
                        <button onClick={closeModal} className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            )}

            <Footer />
            <Security/>
        </>
    );
};

export default AdminPage;