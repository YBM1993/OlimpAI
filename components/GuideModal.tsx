
import React from 'react';
import { Button } from './Button';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span className="text-[#00AFCA]">🚀</span> Платформаны қолдану нұсқаулығы
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-8 space-y-8">
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-[#00AFCA] flex items-center justify-center font-bold">1</div>
              <h3 className="text-lg font-bold text-slate-800">Код жазу және тілді таңдау</h3>
            </div>
            <p className="text-slate-600 ml-11">
              Сол жақтағы редакторға шешіміңді жаз. Жоғарғы панельден бағдарламалау тілін таңда (C++, Python, Java). Кодты автоматты түрде тазалау үшін "Тазалау" батырмасын қолдан.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-[#00AFCA] flex items-center justify-center font-bold">2</div>
              <h3 className="text-lg font-bold text-slate-800">Виртуалды Судьямен тексеру</h3>
            </div>
            <p className="text-slate-600 ml-11">
              Төменгі <b>"Енгізу (Stdin)"</b> бөліміне тест деректерін жаз. Содан кейін <b>"Іске қосу"</b> батырмасын бас. Жүйе сенің кодыңа талдау жасап, нәтижені немесе қателерді (Runtime Error т.б.) көрсетеді.
            </p>
          </section>

          <section className="space-y-3 border-l-4 border-[#00AFCA] pl-6 py-2 bg-slate-50 rounded-r-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#00AFCA] text-white flex items-center justify-center font-bold">3</div>
              <h3 className="text-lg font-bold text-slate-800">Ментормен (OlympAI) сөйлесу</h3>
            </div>
            <p className="text-slate-700">
              Егер кодыңда қате болса немесе алгоритмді қалай жақсартуды білмесең, оң жақтағы чатқа сұрақ қой. 
            </p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 mt-2 text-sm italic text-slate-500">
              💡 <b>Есіңде болсын:</b> OlympAI саған дайын кодты бермейді. Ол сенің дұрыс бағытта ойлануың үшін бағыттаушы сұрақтар қояды. Бұл — олимпиадаға нағыз дайындық!
            </div>
          </section>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
              <h4 className="font-bold text-orange-800 text-sm mb-1">⚠️ Жиі кетуі мүмкін қателер:</h4>
              <ul className="text-xs text-orange-700 list-disc ml-4 space-y-1">
                <li>Integer Overflow (long long қолдан)</li>
                <li>Уақыт шектеуі (O(N^2) орнына O(N log N))</li>
                <li>Төтенше жағдайлар (N=1 немесе бос массив)</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
              <h4 className="font-bold text-green-800 text-sm mb-1">✅ Нәтижеге жету:</h4>
              <ul className="text-xs text-green-700 list-disc ml-4 space-y-1">
                <li>Тақырыптарды таңдап оқы</li>
                <li>Ментормен қазақша еркін сөйлес</li>
                <li>Алтын медальға ұмтыл!</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 flex justify-end bg-slate-50 rounded-b-2xl">
          <Button onClick={onClose} className="!px-8">Түсінікті, бастаймыз!</Button>
        </div>
      </div>
    </div>
  );
};
