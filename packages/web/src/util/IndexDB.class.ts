export interface ChatRecord {
  senderName: string;
  npcName: string;
  memoryId: string;
  conversationId: string;
  sendMsg: string;
  npcMsg: string;
  sendTime: string;
  receiveTime: string;
  sendAction: string;
  npcAction: string;
}

export class ChatDBClass {
  private dbName: string;
  private storeName: string;
  private db: IDBDatabase | null = null;

  constructor(dbName = "EulerAIChatDB", storeName = "dialog") {
    this.dbName = dbName;
    this.storeName = storeName;
  }

  async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // 检查对象存储是否已经存在
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, {
            keyPath: "id",
            autoIncrement: true,
          });

          // 创建索引
          store.createIndex("memoryId", "memoryId", {
            unique: false,
          });
        } else {
          const store = (
            event.target as IDBOpenDBRequest
          ).transaction?.objectStore(this.storeName);

          // 检查索引是否已经存在
          if (store && !store.indexNames.contains("memoryId")) {
            store.createIndex("memoryId", "memoryId", {
              unique: false,
            });
          }
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  async addChatRecord(record: ChatRecord): Promise<number> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.add(record);

      request.onsuccess = () => {
        resolve(request.result as number);
      };

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }

  async getAllChatRecordsById(id: string): Promise<ChatRecord[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], "readonly");
      const store = transaction.objectStore(this.storeName);
      const index = store.index("memoryId");
      // 使用conversationId索引加快搜索速度
      const request = index.getAll(id);

      request.onsuccess = () => {
        resolve(request.result as ChatRecord[]);
      };

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }

  async deleteChatRecord(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error);
      };
    });
  }
}

export const IndexedDB = new ChatDBClass();
